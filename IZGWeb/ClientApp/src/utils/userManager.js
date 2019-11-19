import { createUserManager } from 'redux-oidc';
import * as config from "../auth_config.json";

const userManagerConfig = {
    client_id: config.clientId,
    redirect_uri: `${window.location.protocol}//${window.location.hostname}${window.location.port ? `:${window.location.port}` : ''}/callback`,
    response_type: config.responseType,
    scope: 'openid email profile ' + config.additionalScopes,
    authority: config.authority,
    extraQueryParams: {audience: config.audience},
    silent_redirect_uri: `${window.location.protocol}//${window.location.hostname}${window.location.port ? `:${window.location.port}` : ''}/silent_renew.html`,
    automaticSilentRenew: false,
    filterProtocolClaims: true,
    loadUserInfo: true,
};

userManagerConfig.scope = userManagerConfig.scope.trim();

const userManager = createUserManager(userManagerConfig);

export default userManager;