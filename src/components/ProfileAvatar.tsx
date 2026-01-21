// use shadcn avatar component and it accepts
// users fullname or first name and last name to generate initials
// and image prop for profile picture
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { ComponentProps } from "react";

interface ProfileAvatarProps extends ComponentProps<typeof Avatar> {
  name: string;
  imageUrl?: string;
  fallbackClassName?: string;
}

export default function ProfileAvatar({
  name,
  imageUrl,
  fallbackClassName,
  ...props
}: ProfileAvatarProps) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <Avatar {...props}>
      {imageUrl ? (
        <AvatarImage src={imageUrl} alt={name} />
      ) : (
        <AvatarFallback className={fallbackClassName}>
          {initials}
        </AvatarFallback>
      )}
    </Avatar>
  );
}
