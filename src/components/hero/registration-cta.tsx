import type { ComponentProps } from "react";
import { ArrowRight } from "lucide-react";

type RegistrationCtaProps = Omit<ComponentProps<"a">, "children"> & {
  onDark?: boolean;
};

export function VerticalSwapLabel({ children }: { children: string }) {
  return (
    <span aria-hidden="true" className="relative block h-5 overflow-hidden text-base font-medium leading-5">
      <span className="block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full group-focus-visible:-translate-y-full motion-reduce:transform-none">
        {children}
      </span>
      <span className="absolute inset-0 translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0 group-focus-visible:translate-y-0 motion-reduce:hidden">
        {children}
      </span>
    </span>
  );
}

export function HorizontalSwapArrow() {
  return (
    <span aria-hidden="true" className="relative block size-4 overflow-hidden">
      <ArrowRight className="absolute inset-0 size-4 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-[140%] group-focus-visible:translate-x-[140%] motion-reduce:transform-none" />
      <ArrowRight className="absolute inset-0 size-4 -translate-x-[140%] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0 group-focus-visible:translate-x-0 motion-reduce:hidden" />
    </span>
  );
}

export function RegistrationCta({ className = "", onDark = true, ...props }: RegistrationCtaProps) {
  return (
    <a
      {...props}
      aria-label={props["aria-label"] ?? "Daftar"}
      className={`group inline-flex h-12 items-center justify-center overflow-hidden border border-blue-400/60 p-[3px] shadow-sm transition-[transform,border-color] hover:-translate-y-0.5 hover:border-blue-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 ${onDark ? "bg-white text-ink" : "bg-ink text-white"} ${className}`}
    >
      <span className="flex h-10 items-center justify-center px-4">
        <VerticalSwapLabel>Daftar</VerticalSwapLabel>
      </span>
      <span className="flex size-10 items-center justify-center bg-blue-600 text-white">
        <HorizontalSwapArrow />
      </span>
    </a>
  );
}
