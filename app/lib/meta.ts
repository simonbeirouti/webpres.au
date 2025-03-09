interface MetaProps {
	title?: string;
	description?: string;
	image?: string;
	url?: string;
	type?: string;
}

export const createMeta = ({
	title,
	description,
	image,
	url,
	type = "website",
}: MetaProps) => {
	return [
		{title: title ? `WebPres | ${title}` : "WebPres"},
		{name: "description", content: description},
		{property: "og:title", content: title},
		{property: "og:description", content: description},
		{property: "og:type", content: type},
		{property: "og:image", content: "https://webpres.au/content/og.jpg"},
		{property: "og:url", content: "https://webpres.au/content/og.jpg"},
		{name: "twitter:card", content: "summary_large_image"},
		{name: "twitter:title", content: title},
		{name: "twitter:description", content: description},
		{name: "twitter:image", content: "https://webpres.au/content/og.jpg"},
	].filter((meta): meta is NonNullable<typeof meta> => Boolean(meta));
};