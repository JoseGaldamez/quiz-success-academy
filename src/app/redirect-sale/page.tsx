import React, { Suspense, useEffect } from 'react'
import RedirectSale from '@/components/sale/redirectSale';

const RedirectPage = () => {
      return (
            <>
                  <Suspense>
                        <RedirectSale />
                  </Suspense>
            </>
      );
}

export default RedirectPage