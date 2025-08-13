import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Script from "next/script"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Franchise Store | Encontre sua Franquia",
  description: "A plataforma que conecta você à sua franquia ideal. Comece a empreender com segurança e suporte.",
  icons: {
    icon: "https://trunk.v4kuri.com.br/media/user_files/FjKONMgXz2P8KwOZTDF5xjkCR7OfMkmi_2cae352c367d436800c26551ef606e3702a54289b6fc8f1d337fa6bdad0d16ca.ico",
    apple: "https://trunk.v4kuri.com.br/media/user_files/J3wOLhCk7GzV7sHPhFxjF7JMkcPAjj0v_d191ed0e06bcc2e960146dba65e440ad9ad85bf940918e408ed5fa96f0016ee5.png",
    other: [
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        url: "https://trunk.v4kuri.com.br/media/user_files/FjKONMgXz2P8KwOZTDF5xjkCR7OfMkmi_2cae352c367d436800c26551ef606e3702a54289b6fc8f1d337fa6bdad0d16ca.ico",
      },
      {
        rel: "icon", 
        type: "image/png",
        sizes: "16x16",
        url: "https://trunk.v4kuri.com.br/media/user_files/FjKONMgXz2P8KwOZTDF5xjkCR7OfMkmi_2cae352c367d436800c26551ef606e3702a54289b6fc8f1d337fa6bdad0d16ca.ico",
      },
    ],
  },
    generator: 'v0.app'
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
      <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=227015333622225&ev=PageView&noscript=1"
          />
        </noscript>

        {children}

        {/* Script do Meta Pixel */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '227015333622225');
            fbq('track', 'PageView');
          `}
        </Script>
        
        {/* -> 2. Adicione o Script do Clarity aqui, antes de fechar o <body> */}
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "sijwikl8u8");
          `}
        </Script>
      </body>
    </html>
  )
}
