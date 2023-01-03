import styled from "@emotion/styled";
import { CustomAvatarImg } from "../app/common";

interface PersonCardProps {
  age?: string;
  name?: string;
  thumbnail?: string;
}

const PersonCard: React.FC<PersonCardProps> = ({ age, name, thumbnail }) => {
  return (
    <PersonCardContainer>
      <PersonCardLoad thumbnail={thumbnail} />

      {/* <CustomAvatarImg
        src="https://serving.photos.photobox.com/60902681b2a2bbe70c5e2f826e2a7f9aa2cc694b16b23169c6fc240cc7f5bdb67c199c7c.jpg"
        alt="Sahar"
        sizeOfAvatar={40}
        style={{ marginRight: "15px", marginLeft: "30px" }}
      /> */}
      <PerosnCardTitle>{name ? name : "Person name"}</PerosnCardTitle>
      <PersonCardDescription>
        Age: {age ? age : "Person age"}
      </PersonCardDescription>
    </PersonCardContainer>
  );
};

export default PersonCard;

const PersonCardContainer = styled.div`
  width: 190px;
  height: 90px;
  background: #ffff;
  box-shadow: 0 1px 25px rgba(0, 0, 0, 0.2);
  padding: 12px 10px;
  margin: 2px;
`;

// thumbnail

const PersonCardLoad = styled.div<{ thumbnail?: string }>`
  width: 70px;
  height: 70px;
  position: relative;
  float: left;
  background: linear-gradient(
    120deg,
    #e5e5e5 30%,
    #f0f0f0 38%,
    #f0f0f0 40%,
    #e5e5e5 48%
  );
  background-image: ${({ thumbnail }) =>
    thumbnail
      ? `url("${thumbnail}")`
      : `linear-gradient(
    120deg,
    #e5e5e5 30%,
    #f0f0f0 38%,
    #f0f0f0 40%,
    #e5e5e5 48%
  ) `};
  border-radius: 50%;
  background-size: 100%;
  background-position: 100% 0;
  border: 2px solid aliceblue;

  -moz-box-shadow: 0px 6px 5px #ccc;
  -webkit-box-shadow: 0px 6px 5px #ccc;
  box-shadow: 0px 6px 5px #ccc;
  -moz-border-radius: 190px;
  -webkit-border-radius: 190px;
  border-radius: 190px;
`;

const PerosnCardTitle = styled.div`
  display: flex;
  justify-content: center;
  //   align-items: center;
  float: right;
  height: 40px;
  width: 90px;
  max-width: 90px;
  max-height: 40px;
  overflow: hidden;
  //   white-space: nowrap;
  //   text-overflow: ellipsis;
  word-break: break-word;
  border-radius: 5px;
  background: linear-gradient(
    120deg,
    #e5e5e5 30%,
    #f0f0f0 38%,
    #f0f0f0 40%,
    #e5e5e5 48%
  );
  background-size: 200% 100%;
  background-position: 100% 0;
  animation: load89234 2s infinite;
`;

const PersonCardDescription = styled.div`
  width: 90px;
  height: 30px;
  position: relative;
  float: right;
  border-radius: 5px;
  background: linear-gradient(
    120deg,
    #e5e5e5 30%,
    #f0f0f0 38%,
    #f0f0f0 40%,
    #e5e5e5 48%
  );
  display: flex;
  margin-top: 10px;
  background-size: 200% 100%;
  background-position: 100% 0;
  animation: load89234 2s infinite;
  align-items: center;
  justify-content: center;
`;
