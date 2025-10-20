import { ENVIRONMENT } from '../../../../environments/environment.dev';

const PROJECT_ROUTE = 'project';

export const API_ENDPOINT = {
  PROJECT: {
    CREATE: `${ENVIRONMENT.API_URL}/${PROJECT_ROUTE}/`,
    GET_ALL: `${ENVIRONMENT.API_URL}/${PROJECT_ROUTE}/`,
    UPDATE: `${ENVIRONMENT.API_URL}/${PROJECT_ROUTE}`,
    DELETE: `${ENVIRONMENT.API_URL}/${PROJECT_ROUTE}`,
  },
};
