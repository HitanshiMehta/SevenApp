// ************** Configuration *************** //

export const MASTER_DATA_SERVER = {
  SERVER_URL: "127.0.0.1",
  PORT: "8000",
};

/* App name details */
export const APP_NAME = {
  sevenApp: "sevenApp",
};

export const MODEL = {
  user: "user",
  game: "game",
  user_profile: "user_profile",
};

// URl parameter
export const PARAMETER = {
  username: "username",
  password: "password",
  user_id: "user_id",
  get_luck: "get_luck",
};

export const localStorageVariableName = {
  userName: "userName",
  userId: "userId",
  coins: "coins",
};

// Redirection
export const app = {
  index: "/Index",
  home: "/Home",
  rollDice: "/RollDice",
  login: "/Login",
  app: "/App",
  introduction: "/Introduction",
  menu: "/Menu",
  history: "/History",
  luck: "/Luck",
};

// ************** Form configuration *************** //

export const formLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 12,
  },
};

export const tailLayout = {
  wrapperCol: {
    offset: 4,
    span: 16,
  },
};

export const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not validate!",
  },
};

// ************** Application component *************** //

export const common = {
  sevenUp: "7 UP",
  sevenDown: "7 DOWN",
  seven: "7",
  gutterRow: "gutter-row",
};

export const amount = {
  text: "text",
  amount: "amount",
  amountPlaceHolder: "Enter betting coins",
  pay: "Pay",
};

export const home = {
  optionMessage: "Please select option!",
  win: "Win",
};

export const index = {
  indexImagePath: "/Images/index.jpg",
  indexImagePath1: "/Images/menu8.png",
  indexImageAlt: "Welcome",
};

export const header = {
  indexImagePath: "/Images/menu1.png",
  indexImageAlt: "Menu",
  left: "left",
  right: "right",
};

export const menuHeader = {
  indexImagePath: "/Images/home.png",
  indexImageAlt: "Home",
};

export const result = {
  rollDice: "Roll Dice",
};

export const luck = {
  win: "Win",
  lose: "Lose",
  youWin: "You Win",
  youLose: "You Lose",
};

export const userInputButton = {
  btnBgColor: "#1d4777",
  btnColor: "#0c284b",
};

export const loginIndex = {
  loginImagePath: "/Images/loginImage.jpg",
  loginImageAlt: "login",
  block: "block",
  none: "none",
};

export const login = {
  usernameLabel: "Username",
  usernameName: "username",
  passwordLabel: "Password",
  passwordName: "password",
  button: "button",
  default: "default",
  submit: "submit",
  login: "login",
  createOne: "Create one",
  dontHaveAccount: "Don't have account?",
};

export const register = {
  passwordNotMatch: "The passwords doesn't match",
  usernameLabel: "Username",
  usernameName: "username",
  passwordLabel: "Password",
  passwordName: "password",
  RePasswordLabel: "Re-Password",
  RePasswordName: "re_password",
  EmailIdLabel: "EmailId",
  EmailIdName: "email",
  EmailType: "email",
  default: "default",
  submit: "submit",
  button: "button",
  haveAccount: "Already have account?",
};

export const rollDice = {
  relative: "relative",
  youLose: "Sorry you lose",
  tryAgain: "Try Again",
};

export const introduction = {
  intro: `7 Up 7 Down is a dice game which is played by betting on numbers. Initially you will get 500 coins.
  You'll select number(less than 7,7 or more than 7) and decide beting coins. Two dices are rolled
  and if addition of numbers on both the dices matches to your betting
  number you will win more coins.`,
  startGame: "Start Game?",
  login: "Login",
  register: "Register",
  letsPlay: "Let's Play",
  block: "block",
  none: "none",
};

export const menu = {
  scoreHistory: "Score History",
  checkLuckGame: "Check Luck Game",
  rules: "Rules",
};

export const history = {
  userChoiceHeading: "Selection",
  userChoice: "user_choice",
  bettingPriceHeading: "Coins",
  bettingPrice: "betting_price",
  diceOneHeading: "Dice One",
  diceOne: "dice_one",
  diceTwoHeading: "Dice Two",
  diceTwo: "dice_two",
  diceResultHeading: "Dice result",
  diceResult: "dice_result",
  resultHeading: "Result",
  result: "result",
};
