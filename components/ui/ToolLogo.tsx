import Image from 'next/image';

interface ToolLogoProps {
  name: string;
  icon?: string | null;
  size?: number;
  wrapperClassName?: string;
  imageClassName?: string;
  textClassName?: string;
  alt?: string;
  priority?: boolean;
}

export default function ToolLogo({
  name,
  icon,
  size = 32,
  wrapperClassName = '',
  imageClassName = '',
  textClassName = '',
  alt,
  priority = false,
}: ToolLogoProps) {
  const safeAlt = alt ?? `${name} logo`;

  return (
    <div
      className={`flex items-center justify-center overflow-hidden ${wrapperClassName}`.trim()}
      aria-label={safeAlt}
    >
      {icon ? (
        <Image
          src={icon}
          alt={safeAlt}
          width={size}
          height={size}
          priority={priority}
          className={`object-contain ${imageClassName}`.trim()}
        />
      ) : (
        <span className={`font-mono ${textClassName}`.trim()}>{name[0]}</span>
      )}
    </div>
  );
}
