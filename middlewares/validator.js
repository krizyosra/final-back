const { check, validationResult } = require("express-validator");
//check pour définir des validateurs pour différents champs dans les requetes
//validation result pour récupérer les resultats de la validation effectué avec check

const registerCheck = () => [
  check("email", "Please enter a valid email address").isEmail(),
  check(
    "password",
    "The password must contain a minimum of 6 characters"
  ).isLength({ min: 6 }),
  check("username", "The username cannot be empty").notEmpty().trim(),
];

const loginCheck = () => [
    check("email", "this field should be a valid email").isEmail(),
    check("password", {msg:"password should have at least 6 characters"}).isLength({ min: 6 })
]

const validator = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    //si les erreurs sont trouvés le middleware répons avec la status 400 avec un tableau des erreurs

    return res.status(400).send(errors.array()[0].msg );
  }

  next();
};

module.exports = {
  registerCheck,
  loginCheck,
  validator,
};

//registercheck et logincheck sont utlisés comme des fcts middlewares dans les routes post
//validator est utlisé comme un middleware final pour vérifier les erreurs de validation avant d'exécuter le traitement principale de la route
