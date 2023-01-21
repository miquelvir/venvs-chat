import { GetAvatar } from "./Avatar.js";
import { respondToVisibility } from "../../utils.js";
import { INTERNAL_CURRENT_USER_ID } from "../../enums.js";

const avatarUris = [
    'https://avataaars.io/?avatarStyle=Transparent&topType=LongHairFro&accessoriesType=Round&hairColor=BrownDark&facialHairType=Blank&clotheType=Hoodie&clotheColor=PastelOrange&eyeType=Squint&eyebrowType=Default&mouthType=Twinkle&skinColor=Brown',
    'https://avataaars.io/?avatarStyle=Transparent&topType=WinterHat1&accessoriesType=Kurt&hatColor=Red&hairColor=Black&facialHairType=BeardMedium&facialHairColor=BrownDark&clotheType=ShirtCrewNeck&clotheColor=Gray01&eyeType=Hearts&eyebrowType=DefaultNatural&mouthType=Vomit&skinColor=Brown',
    'https://avataaars.io/?avatarStyle=Transparent&topType=Hat&accessoriesType=Prescription01&hatColor=PastelGreen&facialHairType=MoustacheMagnum&facialHairColor=Brown&clotheType=ShirtScoopNeck&clotheColor=White&eyeType=Dizzy&eyebrowType=FlatNatural&mouthType=ScreamOpen&skinColor=Brown',
    'https://avataaars.io/?avatarStyle=Transparent&topType=LongHairFroBand&accessoriesType=Blank&hairColor=SilverGray&facialHairType=BeardMedium&facialHairColor=Auburn&clotheType=ShirtCrewNeck&clotheColor=Gray02&eyeType=WinkWacky&eyebrowType=AngryNatural&mouthType=Smile&skinColor=Yellow',
    'https://avataaars.io/?avatarStyle=Transparent&topType=LongHairCurvy&accessoriesType=Kurt&hairColor=Brown&facialHairType=MoustacheFancy&facialHairColor=BrownDark&clotheType=BlazerSweater&clotheColor=Black&eyeType=Happy&eyebrowType=SadConcerned&mouthType=Tongue&skinColor=DarkBrown',
    'https://avataaars.io/?avatarStyle=Transparent&topType=WinterHat2&accessoriesType=Prescription02&hatColor=Pink&hairColor=BlondeGolden&facialHairType=MoustacheFancy&facialHairColor=Platinum&clotheType=Hoodie&clotheColor=PastelYellow&eyeType=Surprised&eyebrowType=UpDown&mouthType=Eating&skinColor=Light',
    'https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairSides&accessoriesType=Prescription01&hatColor=Blue02&hairColor=Blue&facialHairType=BeardLight&facialHairColor=Blonde&clotheType=ShirtCrewNeck&clotheColor=Gray01&eyeType=WinkWacky&eyebrowType=AngryNatural&mouthType=Grimace&skinColor=Yellow',
    'https://avataaars.io/?avatarStyle=Transparent&topType=LongHairCurvy&accessoriesType=Blank&hairColor=Auburn&facialHairType=Blank&facialHairColor=BlondeGolden&clotheType=ShirtVNeck&clotheColor=Blue01&eyeType=Surprised&eyebrowType=Default&mouthType=Default&skinColor=Brown',
    'https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortWaved&accessoriesType=Wayfarers&hairColor=Brown&facialHairType=BeardMajestic&facialHairColor=Auburn&clotheType=BlazerSweater&clotheColor=Heather&eyeType=EyeRoll&eyebrowType=RaisedExcitedNatural&mouthType=Grimace&skinColor=DarkBrown',
    'https://avataaars.io/?avatarStyle=Transparent&topType=Turban&accessoriesType=Round&hatColor=PastelRed&hairColor=BrownDark&facialHairType=BeardMajestic&facialHairColor=Platinum&clotheType=ShirtVNeck&clotheColor=Black&eyeType=Cry&eyebrowType=Angry&mouthType=Sad&skinColor=Pale',
    'https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortWaved&accessoriesType=Prescription02&hatColor=PastelYellow&hairColor=Black&facialHairType=BeardMedium&facialHairColor=Black&clotheType=Overall&clotheColor=Blue03&eyeType=Squint&eyebrowType=DefaultNatural&mouthType=Concerned&skinColor=Yellow',
    'https://avataaars.io/?avatarStyle=Transparent&topType=LongHairStraight&accessoriesType=Wayfarers&hairColor=Black&facialHairType=BeardMedium&facialHairColor=BrownDark&clotheType=GraphicShirt&clotheColor=Heather&graphicType=Skull&eyeType=Surprised&eyebrowType=FlatNatural&mouthType=Serious&skinColor=Pale',
    'https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairFrizzle&accessoriesType=Wayfarers&hairColor=Platinum&facialHairType=BeardMedium&facialHairColor=Blonde&clotheType=Overall&clotheColor=Blue01&graphicType=Bat&eyeType=Wink&eyebrowType=Default&mouthType=Eating&skinColor=Pale',
    'https://avataaars.io/?avatarStyle=Transparent&topType=LongHairBun&accessoriesType=Wayfarers&hairColor=BlondeGolden&facialHairType=MoustacheMagnum&facialHairColor=Blonde&clotheType=BlazerShirt&clotheColor=Gray01&eyeType=Squint&eyebrowType=DefaultNatural&mouthType=Vomit&skinColor=Light',
    'https://avataaars.io/?avatarStyle=Transparent&topType=LongHairCurvy&accessoriesType=Sunglasses&hairColor=Red&facialHairType=MoustacheMagnum&facialHairColor=Auburn&clotheType=Overall&clotheColor=Red&eyeType=Default&eyebrowType=SadConcerned&mouthType=Vomit&skinColor=Light',
    'https://avataaars.io/?avatarStyle=Transparent&topType=LongHairFro&accessoriesType=Blank&hairColor=BrownDark&facialHairType=BeardMedium&facialHairColor=Platinum&clotheType=BlazerSweater&clotheColor=Gray02&graphicType=Bear&eyeType=Dizzy&eyebrowType=Angry&mouthType=Tongue&skinColor=Black',
    'https://avataaars.io/?avatarStyle=Transparent&topType=LongHairCurly&accessoriesType=Kurt&hairColor=Red&facialHairType=BeardMajestic&facialHairColor=Blonde&clotheType=ShirtCrewNeck&clotheColor=PastelOrange&eyeType=Wink&eyebrowType=Angry&mouthType=Smile&skinColor=Pale',
    'https://avataaars.io/?avatarStyle=Transparent&topType=LongHairFrida&accessoriesType=Sunglasses&hairColor=Brown&facialHairType=MoustacheFancy&facialHairColor=Brown&clotheType=BlazerSweater&clotheColor=Heather&eyeType=Cry&eyebrowType=SadConcerned&mouthType=Smile&skinColor=Black',
    'https://avataaars.io/?avatarStyle=Transparent&topType=NoHair&accessoriesType=Prescription02&facialHairType=MoustacheFancy&facialHairColor=Red&clotheType=BlazerSweater&eyeType=Hearts&eyebrowType=DefaultNatural&mouthType=Tongue&skinColor=Black',
    'https://avataaars.io/?avatarStyle=Transparent&topType=Hat&accessoriesType=Round&facialHairType=BeardMajestic&facialHairColor=Brown&clotheType=BlazerSweater&eyeType=Default&eyebrowType=UnibrowNatural&mouthType=ScreamOpen&skinColor=DarkBrown',
    'https://avataaars.io/?avatarStyle=Transparent&topType=LongHairCurly&accessoriesType=Prescription02&hairColor=Blonde&facialHairType=MoustacheMagnum&facialHairColor=Black&clotheType=ShirtVNeck&clotheColor=Pink&eyeType=Default&eyebrowType=AngryNatural&mouthType=Smile&skinColor=DarkBrown',
    'https://avataaars.io/?avatarStyle=Transparent&topType=LongHairBob&accessoriesType=Kurt&hairColor=Blonde&facialHairType=Blank&facialHairColor=Black&clotheType=Overall&clotheColor=White&eyeType=Happy&eyebrowType=UpDown&mouthType=Twinkle&skinColor=Brown',
    'https://avataaars.io/?avatarStyle=Transparent&topType=LongHairFrida&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Overall&clotheColor=Blue03&eyeType=EyeRoll&eyebrowType=UnibrowNatural&mouthType=Grimace&skinColor=DarkBrown',
    'https://avataaars.io/?avatarStyle=Transparent&topType=LongHairStraightStrand&accessoriesType=Blank&hairColor=Platinum&facialHairType=BeardLight&facialHairColor=Brown&clotheType=Overall&clotheColor=Gray02&eyeType=Hearts&eyebrowType=FlatNatural&mouthType=ScreamOpen&skinColor=Tanned',
    'https://avataaars.io/?avatarStyle=Transparent&topType=LongHairStraight&accessoriesType=Kurt&hairColor=Red&facialHairType=BeardMajestic&facialHairColor=BrownDark&clotheType=Hoodie&clotheColor=Heather&eyeType=Dizzy&eyebrowType=UnibrowNatural&mouthType=Default&skinColor=Black'
]; // todo customizable

export const InitAvatarPickerPage = ({ userStore, nextPage }) => {
    const avatarsContainer = document.querySelector(".avatarsCard .avatars");
    
    avatarUris.forEach(avatarUri => {
        avatarsContainer.appendChild(GetAvatar({ avatarUri, onClick: () => {
            userStore.updateUserById(INTERNAL_CURRENT_USER_ID, { avatarUri: avatarUri });
            nextPage();
        }}));
    });

    const avatars = document.querySelector(".avatarsCard .avatars");
    
    respondToVisibility(avatars, () => avatars.scrollTo({ left: (avatars.scrollWidth - avatars.clientWidth) / 2, behavior: 'smooth' }));    
} 