import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'

export const metadata: Metadata = {
  title: "Ravindu's Portfolio",
  description: 'Portfolio website showcasing my work as a Full Stack Developer, UI/UX Designer, and React Enthusiast',
  generator: 'Next.js',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{
          __html: `
            (function() {
              try {
                var theme = localStorage.getItem('theme') || 'system';
                var isDark = false;
                
                if (theme === 'dark') {
                  isDark = true;
                } else if (theme === 'light') {
                  isDark = false;
                } else {
                  // system theme
                  isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                }
                
                // Set education section background immediately
                var style = document.createElement('style');
                style.textContent = isDark ? 
                  '#education { background: transparent !important; background-color: transparent !important; background-image: none !important; }' :
                  '#education { background: linear-gradient(to bottom, #eff6ff, #ffffff, #dbeafe) !important; background-color: #eff6ff !important; background-image: linear-gradient(to bottom, #eff6ff, #ffffff, #dbeafe) !important; }';
                document.head.appendChild(style);
              } catch (e) {
                // Fallback to system preference
                var isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                var style = document.createElement('style');
                style.textContent = isDark ? 
                  '#education { background: transparent !important; background-color: transparent !important; background-image: none !important; }' :
                  '#education { background: linear-gradient(to bottom, #eff6ff, #ffffff, #dbeafe) !important; background-color: #eff6ff !important; background-image: linear-gradient(to bottom, #eff6ff, #ffffff, #dbeafe) !important; }';
                document.head.appendChild(style);
              }
            })();
          `
        }} />
        <style>{`
          html, body, #__next, #root {
            background-color: #eaf3ff;
          }
          @media (prefers-color-scheme: dark) {
            html, body, #__next, #root {
              background-color: #000 !important;
            }
          }
        `}</style>
        <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='16' fill='black'/%3E%3Ctext x='50%' y='50%' font-size='32' font-family='Arial, Helvetica, sans-serif' dy='.35em' text-anchor='middle' fill='white'%3ERP%3C/text%3E%3C/svg%3E" />
        <link href="https://fonts.googleapis.com/css2?family=Cookie&display=swap" rel="stylesheet" />
      </head>
      <body suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
