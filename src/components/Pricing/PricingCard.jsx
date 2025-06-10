import './PricingCard.css';

export function PricingCard({
    title,
    price,
    description,
    features,
    isPopular = false,
    isEnterprise = false,
    link
}) {
    return (
        <div className={`pricing-card ${isPopular ? 'popular' : ''} ${isEnterprise ? 'enterprise' : ''}`}>
            {isPopular && (
                <div className="popular-badge">
                    Most Popular
                </div>
            )}
            <div className="card-header">
                <h3 className={`card-title ${isEnterprise ? 'enterprise' : ''}`}>{title}</h3>
                <div className={`price ${isEnterprise ? 'enterprise' : ''}`}>
                    {price}
                </div>
                {description && (
                    <div className={`card-description ${isEnterprise ? 'enterprise' : ''}`}>
                        {description}
                    </div>
                )}
            </div>
            <div className="card-content">
                <ul className="features-list">
                    {features.map((feature, index) => (
                        <li key={index} className="feature-item">
                            <span className={`feature-check ${isEnterprise ? 'enterprise' : ''}`}>✓</span>
                            {feature}
                        </li>
                    ))}
                </ul>
                <button className="submit-button" onClick={() => window.open(link, '_blank')}>Get Started</button>
            </div>
        </div>
    );
}