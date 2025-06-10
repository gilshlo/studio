import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react'; // For RTL, ArrowRight would be "details"

interface PlaceholderCardProps {
  title: string;
  description: string;
  imageUrl?: string;
  imageHint?: string;
  linkUrl?: string;
  linkText?: string;
  category?: string;
  date?: string;
}

export default function PlaceholderCard({
  title,
  description,
  imageUrl,
  imageHint,
  linkUrl,
  linkText = "קרא עוד",
  category,
  date,
}: PlaceholderCardProps) {
  return (
    <Card className="flex flex-col h-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      {imageUrl && (
        <div className="relative w-full h-48">
          <Image
            src={imageUrl}
            alt={title || "Placeholder Image"}
            layout="fill"
            objectFit="cover"
            data-ai-hint={imageHint || "abstract background"}
          />
        </div>
      )}
      <CardHeader>
        {category && <p className="text-xs text-accent font-semibold mb-1 tracking-wide uppercase">{category}</p>}
        <CardTitle className="font-headline text-xl">{title}</CardTitle>
        {date && <p className="text-sm text-muted-foreground">{date}</p>}
      </CardHeader>
      <CardContent className="flex-grow">
        <CardDescription>{description}</CardDescription>
      </CardContent>
      {linkUrl && (
        <CardFooter>
          <Button variant="link" asChild className="text-primary hover:text-accent p-0">
            <a href={linkUrl}>
              {linkText}
              <ArrowLeft className="ms-2 h-4 w-4" /> {/* ArrowLeft for RTL "Read more ->" */}
            </a>
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
