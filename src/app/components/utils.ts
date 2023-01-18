import Parser from "html-react-parser";


export const AboutMeTitle = Parser(`So who am I ?`);

export const AboutMeText = Parser(`
I'm Sahar Cohen, a passionate software engineer. My mainly profession is
Front-End developing.
<br /> Many people asked me: "Sahar, why didn't you decide to go a
different subject in the whole software world?, Where does the desire
for FE come from?"
<br /> To be honest, I love to see things in my eyes, UI developing and
implemention is the best way to get indication about your writing code.
    <br />
    As a FE developer, I develop my projects with some new and popular
    technologics. Start with React, the most popular library of one single
    page application developing with TypeScript.
    <br /> TypeScript is the best practice we can develop website in a right
    way to prevent bugs and broken values before executing the app. Makes
    our debugging better.
    <br /> In addition, using styled components library to make the app
    style more simpler and clear. With React I mange my states by Hooks for
    local components state and Redux/Mobx for global states who appear and
    affected in many components in our app tree.
    `);

export const SaharAvatarImage = `https://serving.photos.photobox.com/60902681b2a2bbe70c5e2f826e2a7f9aa2cc694b16b23169c6fc240cc7f5bdb67c199c7c.jpg`;

export const arrowToRightSvgXmlns = Parser(`<svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px">
<path d="M7.293 4.707 14.586 12l-7.293 7.293 1.414 1.414L17.414 12 8.707 3.293 7.293 4.707z" />
</svg>`);
export const capitalFirstCharacter = (someString: string) => {
  const newString = someString.charAt(0).toUpperCase() + someString.slice(1);
  return newString;
};

export const splitFullNameByFirstAndLast = (fullname: string) => {
  const splittedName = fullname.split(" ");
  const formatterName = splittedName.map((nameItem) =>
    capitalFirstCharacter(nameItem)
  );
  return formatterName;
};
