"use client";

export function FloatingWhatsApp() {
  return (
    <a
      href="https://wa.me/8801575464185"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with ESTORA Properties on WhatsApp"
      className="group fixed bottom-5 right-5 z-[60] flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_rgba(0,0,0,0.16)] transition-all duration-300 hover:scale-105 hover:shadow-[0_12px_35px_rgba(0,0,0,0.22)] sm:bottom-7 sm:right-7 sm:h-13 sm:w-13"
    >
      <svg
        viewBox="0 0 32 32"
        className="h-[22px] w-[22px] fill-current sm:h-[24px] sm:w-[24px]"
        aria-hidden="true"
      >
        <path d="M19.11 17.38c-.27-.14-1.58-.78-1.83-.87-.25-.09-.43-.14-.61.14-.18.27-.7.87-.86 1.05-.16.18-.32.2-.59.07-.27-.14-1.13-.42-2.15-1.34-.79-.7-1.33-1.56-1.49-1.83-.16-.27-.02-.42.12-.55.12-.12.27-.32.41-.48.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.14-.61-1.47-.84-2.01-.22-.53-.45-.46-.61-.47h-.52c-.18 0-.48.07-.73.34-.25.27-.96.94-.96 2.29s.98 2.66 1.12 2.84c.14.18 1.93 2.95 4.67 4.14.65.28 1.16.45 1.56.58.66.21 1.26.18 1.74.11.53-.08 1.58-.65 1.8-1.27.23-.62.23-1.15.16-1.27-.07-.11-.25-.18-.52-.32Z" />
        <path d="M16 3.2A12.8 12.8 0 0 0 5.05 22.62L3.2 28.8l6.34-1.82A12.8 12.8 0 1 0 16 3.2Zm0 23.25c-2.01 0-3.89-.59-5.47-1.6l-.39-.24-3.76 1.08 1.09-3.66-.25-.4A10.35 10.35 0 1 1 16 26.45Z" />
      </svg>
    </a>
  );
}
