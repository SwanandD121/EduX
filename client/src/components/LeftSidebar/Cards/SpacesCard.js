import { useEffect, useMemo } from "react";
import { Nav, Image } from "react-bootstrap";
import { MdExplore } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { getSpaces } from "../../../redux/slices/topicSlice";
import SkeletonCard from "../../Skeletons/SkeletonCard";

const SpacesCard = () => {
  const { spaces, getSpacesLoading } = useSelector((state) => state.topic);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSpaces());
  }, [dispatch]);

  return useMemo(() => {
    return (
      <Nav className="flex-column side-spaces">
        <Nav.Item className="d-flex align-items-center">
          <MdExplore />
          spaces
        </Nav.Item>
        {getSpacesLoading ? (
          Array.from({ length: 4 }).map((_, idx) => <SkeletonCard key={idx} />)
        ) : (
          spaces?.map((space) => (
            <Nav.Link key={space._id} className="d-flex align-items-center">
              <Image className="space-icon" src={space?.avatar} />
              {space?.name}
            </Nav.Link>
          ))
        )}
      </Nav>
    );
  }, [spaces, getSpacesLoading]);
};


export default SpacesCard;
