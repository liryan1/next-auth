import Image from "next/image";

interface LogoProps {
  h?: number;
}

interface LogoWithTextProps extends LogoProps {
  text: string;
  school?: string;
}

export function LogoWithText({ h, text, school }: LogoWithTextProps) {
  return (
    <div className="flex items-center gap-2 text-4xl">
      <Logo h={h} />
      <div className="relative">
        {text}
        <div className="items-end absolute right-0 bottom-[-20] text-[8px] md:text-[10px] text-muted-foreground">
          {school}
        </div>
      </div>
    </div>
  );
}

export function Logo({ h }: LogoProps) {
  return (
    <Image
      className="p-0 m-0"
      src="/logo.png"
      height={h ?? "40"}
      width={h ?? "40"}
      alt="Logo"
    />
  );
}
