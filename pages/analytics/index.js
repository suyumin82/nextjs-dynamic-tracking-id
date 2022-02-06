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
            <p>facebook pixel events are:</p>
            <p>Purchase: Someone completes a purchase on your website.</p>
            <p>Lead: Someone signs up for a trial or otherwise identifies themselves as a lead on your site.</p>
            <p>Complete registration: Someone completes a registration form on your site, such as a subscription form.</p>
            <p>Add payment info: Someone enters their payment information in the purchase process on your website.</p>
            <p>Add to cart: Someone adds a product to their shopping cart on your site.</p>
            <p>Add to wishlist: Someone adds a product to a wishlist on your site.</p>
            <p>Initiate checkout: Someone starts the checkout process to buy something from your site.</p>
            <p>Search: Someone uses the search function to look for something on your site.</p>
            <p>View content: Someone lands on a specific page on your website.</p>
            <p>Contact: Someone contacts your business.</p>
            <p>Customize product: Someone selects a specific version of a product, such as choosing a certain color.</p>
            <p>Donate: Someone makes a donation to your cause.</p>
            <p>Find location: Someone searches for your business’s physical location.</p>
            <p>Schedule: Someone books an appointment at your business.</p>
            <p>Start trial: Someone signs up for a free trial of your product.</p>
            <p>Submit application: Someone applies for your product, service, or program, such as a credit card.</p>
            <p>Subscribe: Someone subscribes to a paid product or service.</p>
        </div>
    );
}

export default AnalyticList

export async function getServerSideProps({ req, res }) {
    res.setHeader(
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