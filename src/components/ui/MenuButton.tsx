"use client";

type MenuButtonProps = {
  open: boolean;
  onClick: () => void;
};

export function MenuButton({ open, onClick }: MenuButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={open ? "Close menu" : "Open menu"}
      aria-expanded={open}
      className="group flex items-center gap-3"
    >
      <span className="relative flex h-4 w-7 flex-col justify-center">
        <span
          className={`absolute left-0 h-px bg-current transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            open ? "top-1/2 w-7 rotate-45" : "top-[4px] w-7 group-hover:w-5"
          }`}
        />

        <span
          className={`absolute left-0 h-px bg-current transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            open ? "top-1/2 w-7 -rotate-45" : "bottom-[4px] w-5 group-hover:w-7"
          }`}
        />
      </span>

      <span className="text-[10px] tracking-[0.28em]">
        {open ? "CLOSE" : "MENU"}
      </span>
    </button>
  );
}
