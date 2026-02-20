import { getComponentsData } from "@rasengan-ui/data-ui";

const { RASENGAN_REGISTRY_URL } = import.meta.env;

export const componentsData = getComponentsData(RASENGAN_REGISTRY_URL);
