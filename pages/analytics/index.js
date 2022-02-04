function AnalyticList({ articles }) {
    const handleClick = () => {
        window.fbq("track", "Purchase", { currency: "USD", value: 10 });
        console.log('clicked!')
    };

    return (
        <div className="container">
            <script async
                dangerouslySetInnerHTML={{
                    __html: `
    !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
    n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
    document,'script','https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '${articles[0].trackingId}');
    fbq('track', 'PageView');
    fbq('track', 'Lead');
  `,
                }}
            />
            <h1>List of Merchants</h1>
            {articles.map(article => {
                return (
                    <div key={article.id}>
                        <h2>
                            {article.id} {article.merchant} | {article.trackingId}
                        </h2>
                        <hr />
                    </div>
                )
            })}
            <p>SSR - Click the button below to send a purchase event to Pixel</p>
            <button type="button" onClick={handleClick}>
                Buy $10
            </button>{" "}
        </div>
    );
}

export default AnalyticList

export async function getServerSideProps({ req, res }) {
    res.setHeader(
        // 'Cache-Control',
        // 'public, s-maxage=10, stale-while-revalidate=59'
        'Cache-Control', 'no-cache, no-store, max-age=0, must-revalidate'
    )

    const response = await fetch('http://localhost:4000/analytics')
    const data = await response.json()

    return {
        props: {
            articles: data
        }
    }
}