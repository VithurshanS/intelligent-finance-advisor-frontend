import React from 'react';

const Page = async ({params}: {
    params: Promise<{ symbol: string }>;
}) => {
    const symbol = (await params).symbol;
    return (
        <div>
            {symbol}
        </div>
    );
};

export default Page;