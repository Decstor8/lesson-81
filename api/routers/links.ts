import {Router} from "express";
import Link from "../lunkModelsOn/Link";
import {LinkTypes} from "../types";

const linksRouter = Router();

linksRouter.get('/', async (_, res, next) => {
  try {
    const result = await Link.find();
    res.send(result);

  } catch (err) {
    next(err);
  }
});

linksRouter.get('/:shortUrl', async (req, res, next) => {
  try {
    const { shortUrl } = req.params;
    const link = await Link.findOne({shortUrl});

    if (link) {

      res.redirect(301, link.originalUrl);
    } else {
      res.status(404).send({ error: 'Не удалось найти URL' });
    }
  } catch (err) {
    next(err);
  }
});

linksRouter.post('/', async (req, res, next) => {
  try {
    if (!req.body.originalUrl || !req.body.shortUrl) {
      res.status(404).send({error: 'Пожалуйста введите ссылку!'});
    }

    const mainLink: LinkTypes = {
      originalUrl: req.body.originalUrl,
      shortUrl: req.body.shortUrl,
    };

    const link = new Link(mainLink);
    await link.save();

    res.send(link);
  } catch (err) {
    return next(err);
  }
});

export default linksRouter;