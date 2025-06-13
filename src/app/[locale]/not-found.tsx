import { Footer, Header } from '@/components/layout';
import React from 'react'

const NotFound = () => {
  return (
    <html  dir='rtl' data-theme="light">
      <body>
        <Header />
        <main className="h-screen flex flex-col items-center justify-center text-center px-4">
          <h2 className="text-[120px] md:text-[200px] lg:text-[350px] font-bold text-normal">
            4<span className="text-customPalette-300">0</span>4
          </h2>
          <p className="text-lg md:text-2xl lg:text-[2.2rem] font-bold text-normal">
            عفواً! لم يتم العثور على الصفحة.
          </p>
        </main>
        <Footer />
      </body>
    </html>
  );
};

export default NotFound;
