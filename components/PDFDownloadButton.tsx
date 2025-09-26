"use client";
import { PDFDownloadLink } from '@react-pdf/renderer';
import CVDocument from './CVDocument';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { useIsMobile } from '@/components/ui/use-mobile';

export default function PDFDownloadButton() {
  const isMobile = useIsMobile();
  return (
    <PDFDownloadLink
      document={<CVDocument />}
      fileName="T.Ravindu_Piyumal_Thilakarathna_CV.pdf"
      style={{ textDecoration: 'none', width: isMobile ? '100%' : undefined }}
    >
      {() => (
        <Button
          variant={isMobile ? 'outline' : 'outline'}
          size={isMobile ? 'sm' : 'lg'}
          className={`flex items-center gap-2 ${isMobile ? 'w-full px-3 py-2 text-sm rounded-lg border-2 border-blue-500/50 dark:border-blue-400/50' : 'border-2 border-blue-500/50 dark:border-blue-400/50 text-blue-600 dark:text-blue-400 hover:bg-blue-500/10 dark:hover:bg-blue-400/10 px-8 py-4 rounded-full transform hover:scale-105 transition-all duration-300 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm text-lg font-semibold'}`}
        >
          <Download className="w-5 h-5" />
          Download Resume
        </Button>
      )}
    </PDFDownloadLink>
  );
} 