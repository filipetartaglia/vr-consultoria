import Link from "next/link";
import { SITE, whatsappLink } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="bg-navy text-white/60 pt-14 pb-8">
      <div className="wrap">
        <div className="flex flex-wrap justify-between items-start gap-8">
          <div>
            <div className="font-display text-lg text-white">{SITE.name}</div>
            <p className="text-white/50 mt-2 text-sm max-w-[280px]">
              Organização, proteção e planejamento financeiro.
            </p>
          </div>

          <div className="flex gap-10 text-sm">
            <Link href="/servicos" className="hover:text-white transition-colors">
              Serviços
            </Link>
            <Link href="/sobre" className="hover:text-white transition-colors">
              Sobre
            </Link>
            <Link href="/#depoimentos" className="hover:text-white transition-colors">
              Depoimentos
            </Link>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              WhatsApp
            </a>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 text-xs flex flex-wrap justify-between gap-3">
          <span>© {new Date().getFullYear()} {SITE.name}. Todos os direitos reservados.</span>
          <span>{SITE.whatsappDisplay}</span>
        </div>
      </div>
    </footer>
  );
}
