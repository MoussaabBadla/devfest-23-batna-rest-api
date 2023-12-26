import { body } from "express-validator";

const storyFromtextDto = [
    body('language').notEmpty().withMessage('language cannot be empty'),
    body('story_theme').isString().withMessage('story_theme requires'),
    body('story_morals').optional().isArray().notEmpty()
    .custom((value) => {
      if (!value.every((id) => typeof id === 'string')) {
        throw new Error('story_morals.');
      }
      return true;
    }),
    body('story_details').optional().isArray().notEmpty()
    .custom((value) => {
      if (!value.every((id) => typeof id === 'string')) {
        throw new Error('story_details.');
      }
      return true;
    })
];
  
export default storyFromtextDto