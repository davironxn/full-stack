'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, Edit3 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export interface ProjectCardProps {
  id?: number;
  title: string;
  description: string;
  imageUrl?: string;
  url?: string;
  tags?: string[];
  onEdit?: () => void;
}

export function ProjectCard({
  title,
  description,
  imageUrl,
  url,
  tags = [],
  onEdit,
}: ProjectCardProps) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 200, damping: 15 }}
    >
      <Card
        className="
          group relative overflow-hidden border border-border/60
          bg-gradient-to-br from-background/80 to-background/60
          backdrop-blur-md shadow-md transition-all duration-300
          hover:shadow-lg hover:border-primary/40
        "
      >
        {/* Image */}
        {imageUrl && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative h-48 w-full overflow-hidden"
          >
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
          </motion.div>
        )}

        <CardHeader className="space-y-2 p-4">
          <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
          <p className="text-muted-foreground text-sm line-clamp-2">
            {description}
          </p>
        </CardHeader>

        {tags.length > 0 && (
          <CardContent className="flex flex-wrap gap-2 px-4 pb-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-primary/10 px-2 py-1 text-xs text-primary"
              >
                {tag}
              </span>
            ))}
          </CardContent>
        )}

        <CardFooter className="flex justify-between items-center px-4 py-3 border-t border-border/50">
          {url && (
            <Link href={url} target="_blank" rel="noopener noreferrer">
              <Button
                size="sm"
                variant="outline"
                className="gap-2 transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                <ExternalLink className="h-4 w-4" /> View
              </Button>
            </Link>
          )}

          {onEdit && (
            <Button
              size="sm"
              variant="ghost"
              onClick={onEdit}
              className="gap-2 text-muted-foreground hover:text-primary"
            >
              <Edit3 className="h-4 w-4" /> Edit
            </Button>
          )}
        </CardFooter>

        <motion.div
          className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background:
              'radial-gradient(circle at 50% 0%, rgba(147,197,253,0.2), transparent 70%)',
          }}
        />
      </Card>
    </motion.div>
  );
}
