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
		{property: "og:image", content: image ? `${process.env.SITE_URL}${image}` : process.env.SITE_URL},
		{property: "og:url", content: url ? `${process.env.SITE_URL}${url}` : process.env.SITE_URL},
		{name: "twitter:card", content: "summary_large_image"},
		{name: "twitter:title", content: title},
		{name: "twitter:description", content: description},
		{name: "twitter:image", content: image ? `${process.env.SITE_URL}${image}` : process.env.SITE_URL},
	].filter((meta): meta is NonNullable<typeof meta> => Boolean(meta));
};