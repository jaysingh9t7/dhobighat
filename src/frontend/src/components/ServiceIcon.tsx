import { Footprints, Layers, Shirt, Wind, Zap } from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  shirt: Shirt,
  wind: Wind,
  layers: Layers,
  footprints: Footprints,
  zap: Zap,
};

interface ServiceIconProps {
  name: string;
  className?: string;
  style?: React.CSSProperties;
}

export function ServiceIcon({ name, className, style }: ServiceIconProps) {
  const Icon = iconMap[name] ?? Shirt;
  return <Icon className={className} style={style} />;
}
