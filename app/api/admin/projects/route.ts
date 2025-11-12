import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireServerSession } from "@/lib/requireSession";
import fs from "fs/promises";
import path from "path";

function isAdminEmail(email?: string | null) {
  const env = process.env.ADMIN_EMAILS ?? process.env.ADMIN_EMAIL ?? "";
  const allowed = env
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  return email ? allowed.includes(email) : false;
}

export async function POST(request: Request) {
  try {
    const token = await requireServerSession(request).catch(() => null);

    if (!token) {
      console.warn('Unauthorized request to create project (no session)');
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const email = (token as any)?.email ?? (token as any)?.user?.email;
    if (!isAdminEmail(email)) {
      console.warn('Forbidden: user not in admin list', { email, ADMIN_EMAILS: process.env.ADMIN_EMAILS ?? process.env.ADMIN_EMAIL });
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Support both JSON body (legacy) and multipart/form-data with files
    const contentType = (request.headers.get('content-type') || '').toLowerCase();

    let slug: string | undefined;
    let title: string | undefined;
    let description: string | undefined;
    let url: string | null = null;
    let tags: string[] | string | null = null;
    let imageUrl: string | null = null;

    // final image url after potential file save
    let finalImageUrl: string | null = null;

    if (contentType.includes('multipart/form-data')) {
      const form = await request.formData();
      slug = form.get('slug')?.toString() ?? '';
      title = form.get('title')?.toString() ?? '';
      description = form.get('description')?.toString() ?? '';
      url = form.get('url')?.toString() ?? null;

      const tagsField = form.get('tags')?.toString() ?? null;
      try {
        tags = tagsField ? JSON.parse(tagsField) : null;
      } catch (e) {
        tags = tagsField ? tagsField.split(',').map((t) => t.trim()).filter(Boolean) : null;
      }

      const imageField = form.get('image');
      const imageUrlField = form.get('imageUrl')?.toString() ?? null;
      imageUrl = imageUrlField;

      if (imageField && typeof (imageField as any).arrayBuffer === 'function') {
        try {
          const file: any = imageField;
          const arrayBuffer = await file.arrayBuffer();
          const buffer = Buffer.from(arrayBuffer);
          const mime = file.type || '';
          let ext = 'png';
          if (mime) ext = mime.split('/')?.[1]?.split('+')?.[0] ?? 'png';
          else if (file.name) ext = path.extname(file.name).replace('.', '') || 'png';

          const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
          await fs.mkdir(uploadsDir, { recursive: true });
          const safeName = slug ? `${slug}-${Date.now().toString(36)}` : `${Date.now().toString(36)}`;
          const filename = `${safeName}.${ext}`;
          const filepath = path.join(uploadsDir, filename);
          await fs.writeFile(filepath, buffer);
          finalImageUrl = `/uploads/${filename}`;
        } catch (err) {
          console.error('Error saving multipart uploaded image:', err);
        }
      } else {
        finalImageUrl = imageUrl;
      }
    } else {
      const payload = await request.json();
      slug = payload.slug;
      title = payload.title;
      description = payload.description;
      url = payload.url ?? null;
      tags = payload.tags ?? null;
      imageUrl = payload.imageUrl ?? null;
      // handle legacy base64 if present
      const imageBase64 = payload.imageBase64;
      if (imageBase64 && typeof imageBase64 === 'string') {
        try {
          const match = imageBase64.match(/^data:(.+);base64,(.+)$/);
          let buffer: Buffer;
          let ext = 'png';
          if (match) {
            const mime = match[1];
            const data = match[2];
            buffer = Buffer.from(data, 'base64');
            ext = mime.split('/')?.[1]?.split('+')?.[0] ?? 'png';
          } else {
            buffer = Buffer.from(imageBase64, 'base64');
          }

          const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
          await fs.mkdir(uploadsDir, { recursive: true });
          const safeName = slug ? `${slug}-${Date.now().toString(36)}` : `${Date.now().toString(36)}`;
          const filename = `${safeName}.${ext}`;
          const filepath = path.join(uploadsDir, filename);
          await fs.writeFile(filepath, buffer);
          finalImageUrl = `/uploads/${filename}`;
        } catch (err) {
          console.error('Error saving uploaded image:', err);
        }
      } else {
        finalImageUrl = imageUrl;
      }
    }

    if (!slug || !title || !description) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const project = await prisma.project.create({
      data: {
        slug,
        title,
        description,
        url,
        tags: Array.isArray(tags) ? tags.join(",") : tags ?? null,
        imageUrl: finalImageUrl,
      },
    });

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error("❌ Project creation error:", error);

    return NextResponse.json(
      { error: "Server error while creating project" },
      { status: 500 }
    );
  }
}
