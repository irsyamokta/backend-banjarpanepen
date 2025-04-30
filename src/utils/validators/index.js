import { registerValidator, loginValidator } from "./validateAuth.js";
import { updateUserValidator } from "./validateUser.js";
import { articleValidator } from "./validateArticle.js";
import { packageValidator } from "./validatePackage.js";
// import { createArticleValidator, updateArticleValidator } from "./validateArticle.js";
// import { changePasswordValidator, resetPasswordValidator, forgotPasswordValidator } from "./validatePassword.js";
// import { createNewsValidator, updateNewsValidator, newsStatusValidator } from "./validateNews.js";

export { 
    registerValidator, 
    loginValidator, 
    updateUserValidator,
    articleValidator,
    packageValidator,
    // changePasswordValidator, 
    // resetPasswordValidator, 
    // forgotPasswordValidator,
};