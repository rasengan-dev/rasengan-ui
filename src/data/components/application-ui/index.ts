import { ComponentGroup } from "../type";

const { RASENGAN_PREVIEW_BASE_URL } = import.meta.env;

export const applicationUIComponents: ComponentGroup[] = [
	// Cards components
	{
		label: "cards",
		name: "Cards",
		componentsType: [
			{
				label: "profile",
				name: "Profile Card",
				description: `A chakra-infused profile card to display user information in a visually appealing way.
Ready to drop into any React app, this card is designed to be both functional and aesthetically pleasing.`,
				image: "",
				components: [
					{
						label: "profile-01",
						name: "Profile card 01",
						link: `${RASENGAN_PREVIEW_BASE_URL}/application-ui/cards/profile-01`,
						code: "",
						height: 800,
						isDarkEnabled: false,
						pricing: "premium",
					},
					{
						label: "profile-02",
						name: "Profile card 02",
						link: `${RASENGAN_PREVIEW_BASE_URL}/application-ui/cards/profile-02`,
						code: "",
						height: 800,
						isDarkEnabled: false,
						pricing: "premium",
					},
					{
						label: "profile-03",
						name: "Edit Profile card 03",
						link: `${RASENGAN_PREVIEW_BASE_URL}/application-ui/cards/profile-03`,
						code: "",
						height: 800,
						isDarkEnabled: false,
						pricing: "premium",
					},
					{
						label: "profile-04",
						name: "Profile card 04",
						link: `${RASENGAN_PREVIEW_BASE_URL}/application-ui/cards/profile-04`,
						code: "",
						height: 800,
						isDarkEnabled: false,
						pricing: "premium",
					},
				],
			},
			{
				label: "join",
				name: "Join Card",
				description: `Beautifully crafted cards inviting users to sign up, join a community, or unlock special content.
Chakra-infused, responsive, and ready to drop into any React app — perfect for growing your ninja clan.`,
				image: "",
				components: [
					{
						label: "join-01",
						name: "Invite to join Community card 01",
						link: `${RASENGAN_PREVIEW_BASE_URL}/application-ui/cards/join-01`,
						code: "",
						height: 500,
						isDarkEnabled: false,
						pricing: "premium",
					},
					{
						label: "join-02",
						name: "Invite to join Community card 02",
						link: `${RASENGAN_PREVIEW_BASE_URL}/application-ui/cards/join-02`,
						code: "",
						height: 500,
						isDarkEnabled: false,
						pricing: "premium",
					},
					{
						label: "join-03",
						name: "Invite to join Community card 03",
						link: `${RASENGAN_PREVIEW_BASE_URL}/application-ui/cards/join-03`,
						code: "",
						height: 500,
						isDarkEnabled: false,
						pricing: "premium",
					},
					{
						label: "join-04",
						name: "Invite to join Community card 04",
						link: `${RASENGAN_PREVIEW_BASE_URL}/application-ui/cards/join-04`,
						code: "",
						height: 500,
						isDarkEnabled: false,
						pricing: "premium",
					},
				],
			},
			{
				label: "booking",
				name: "Booking Card",
				description: `Elegant, ready-to-use cards to showcase appointments, events, or reservations.
Fully responsive, themeable, and built to drop effortlessly into any React app — so users can book with the speed of a shinobi.`,
				image: "",
				components: [
					{
						label: "booking-01",
						name: "Booking place card 01",
						link: `${RASENGAN_PREVIEW_BASE_URL}/application-ui/cards/booking-01`,
						code: "",
						height: 800,
						isDarkEnabled: false,
						pricing: "premium",
					},
				],
			},
			{
				label: "invite",
				name: "Invite Card",
				description: `Beautifully designed cards that prompt users to join your team, project, or workspace.
Responsive, themeable, and chakra-infused — ready to drop into any React app to turn visitors into collaborators.`,
				image: "",
				components: [
					{
						label: "invite-01",
						name: "Invite for collaboration card 01",
						link: `${RASENGAN_PREVIEW_BASE_URL}/application-ui/cards/invite-01`,
						code: "",
						height: 800,
						isDarkEnabled: false,
						pricing: "premium",
					},
					{
						label: "invite-02",
						name: "Invite for collaboration card 02",
						link: `${RASENGAN_PREVIEW_BASE_URL}/application-ui/cards/invite-02`,
						code: "",
						height: 800,
						isDarkEnabled: false,
						pricing: "premium",
					},
				],
			},
			{
				label: "upload",
				name: "Upload Card",
				description: `Intuitive, beautifully styled cards for users to upload files, images, or documents.
Chakra-infused, responsive, and ready to drop into any React app — making file uploads feel seamless and elegant.`,
				image: "",
				components: [
					{
						label: "upload-01",
						name: "Upload card 01",
						link: `${RASENGAN_PREVIEW_BASE_URL}/application-ui/cards/upload-01`,
						code: "",
						height: 800,
						isDarkEnabled: false,
						pricing: "premium",
					},
					{
						label: "upload-02",
						name: "Upload card 02",
						link: `${RASENGAN_PREVIEW_BASE_URL}/application-ui/cards/upload-02`,
						code: "",
						height: 800,
						isDarkEnabled: false,
						pricing: "premium",
					},
				],
			},
		],
	},

	// Form components
	{
		label: "forms",
		name: "Forms",
		componentsType: [
			{
				label: "inputs",
				name: "Text Input",
				description: `Clean, accessible, and themeable input fields to capture user data effortlessly.
From simple text boxes to complex form patterns — all chakra-infused and styled to blend seamlessly into any React app.`,
				image: "",
				components: [
					{
						label: "input-01",
						name: "Chatbot text input 01",
						link: `${RASENGAN_PREVIEW_BASE_URL}/application-ui/forms/input-01`,
						code: "",
						height: 500,
						isDarkEnabled: false,
						pricing: "premium",
					},
					{
						label: "input-02",
						name: "Chatbot text input 02",
						link: `${RASENGAN_PREVIEW_BASE_URL}/application-ui/forms/input-02`,
						code: "",
						height: 500,
						isDarkEnabled: false,
						pricing: "premium",
					},
					{
						label: "input-03",
						name: "Tiny text input 03",
						link: `${RASENGAN_PREVIEW_BASE_URL}/application-ui/forms/input-03`,
						code: "",
						height: 500,
						isDarkEnabled: false,
						pricing: "premium",
					},
					{
						label: "input-04",
						name: "Tiny text input 04",
						link: `${RASENGAN_PREVIEW_BASE_URL}/application-ui/forms/input-04`,
						code: "",
						height: 500,
						isDarkEnabled: false,
						pricing: "premium",
					},
					{
						label: "input-05",
						name: "Chatbot text input 05",
						link: `${RASENGAN_PREVIEW_BASE_URL}/application-ui/forms/input-05`,
						code: "",
						height: 500,
						isDarkEnabled: false,
						pricing: "premium",
					},
					{
						label: "input-06",
						name: "Social Network text input 06",
						link: `${RASENGAN_PREVIEW_BASE_URL}/application-ui/forms/input-06`,
						code: "",
						height: 800,
						isDarkEnabled: false,
						pricing: "premium",
					},
				],
			},

			{
				label: "filters",
				name: "Filters",
				description: `Empower users to refine, sort, and explore your content effortlessly.
These chakra-infused, ready-to-use filter components drop seamlessly into any React app — keeping experiences fast, intuitive, and beautifully organized.`,
				image: "",
				components: [
					{
						label: "filter-01",
						name: "Dashboard filter 01",
						link: `${RASENGAN_PREVIEW_BASE_URL}/application-ui/forms/filter-01`,
						code: "",
						height: 500,
						isDarkEnabled: false,
						pricing: "premium",
					},
				],
			},

			{
				label: "registration",
				name: "Registration",
				description: `Smooth, secure, and beautifully styled auth pages to onboard your users like true shinobi.
Ready-to-use, themeable, and built to drop effortlessly into any React app — because first impressions matter.`,
				image: "",
				components: [
					{
						label: "registration-01",
						name: "Signin page 01",
						link: `${RASENGAN_PREVIEW_BASE_URL}/application-ui/forms/registration-01`,
						code: "",
						height: 800,
						isDarkEnabled: false,
						pricing: "premium",
					},
					{
						label: "registration-02",
						name: "Signin page 02",
						link: `${RASENGAN_PREVIEW_BASE_URL}/application-ui/forms/registration-02`,
						code: "",
						height: 800,
						isDarkEnabled: false,
						pricing: "premium",
					},
					{
						label: "registration-03",
						name: "Signin page 03",
						link: `${RASENGAN_PREVIEW_BASE_URL}/application-ui/forms/registration-03`,
						code: "",
						height: 800,
						isDarkEnabled: false,
						pricing: "premium",
					},
					{
						label: "registration-04",
						name: "Signin page 04",
						link: `${RASENGAN_PREVIEW_BASE_URL}/application-ui/forms/registration-04`,
						code: "",
						height: 800,
						isDarkEnabled: false,
						pricing: "premium",
					},
					{
						label: "registration-05",
						name: "Signin page 05",
						link: `${RASENGAN_PREVIEW_BASE_URL}/application-ui/forms/registration-05`,
						code: "",
						height: 800,
						isDarkEnabled: false,
						pricing: "premium",
					},
				],
			},
		],
	},

	// Elements components
	{
		label: "elements",
		name: "Elements",
		componentsType: [],
	},

	// Feedbacks components
	{
		label: "feedbacks",
		name: "Feedbacks",
		componentsType: [],
	},
];
