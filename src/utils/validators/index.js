import { registerValidator, loginValidator } from "./validateAuth.js";
import { updateUserValidator } from "./validateUser.js";
import { articleValidator } from "./validateArticle.js";
import { packageValidator } from "./validatePackage.js";
import { eventValidator } from "./validateEvent.js";
import { galleryValidator } from "./validateGallery.js";
// import { createArticleValidator, updateArticleValidator } from "./validateArticle.js";
// import { changePasswordValidator, resetPasswordValidator, forgotPasswordValidator } from "./validatePassword.js";
// import { createNewsValidator, updateNewsValidator, newsStatusValidator } from "./validateNews.js";

export { 
    registerValidator, 
    loginValidator, 
    updateUserValidator,
    articleValidator,
    packageValidator,
    eventValidator,
    galleryValidator,
    // changePasswordValidator, 
    // resetPasswordValidator, 
    // forgotPasswordValidator,
};