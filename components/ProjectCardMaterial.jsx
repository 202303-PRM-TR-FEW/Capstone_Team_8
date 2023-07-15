import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Tooltip,
} from "@material-tailwind/react";
import Image from "next/legacy/image";
import Link from "next/link";

function CardEx({ project, props }) {
  return (
    <Card className="w-96">
      <CardHeader floated={false} className="h-80">
        <Link
          key={project.id}
          className="block py-2 px-3 "
          href={{
            pathname: `/project/${project?.id}`,
            query: { loading: props.loading, user: props.user },
          }}
        >
          <Image
            src={project?.img || welcome}
            width={100}
            height={75}
            layout="responsive"
            alt="profile-picture"
          />{" "}
        </Link>
      </CardHeader>
      <CardBody className="">
        <Typography variant="h4" color="blue-gray" className="mb-2">
          {project.title}
        </Typography>
        <Typography color="blue" className="font-medium" textGradient>
          <div className=" w-full flex flex-col gap-2 text-sm">
            <div className="h-2 w-full bg-gray-200 rounded">
              <div
                style={{
                  maxWidth: "100%",
                  width: `${(project.totalDonations / project.goal) * 100}%`,
                }}
                className="h-2  bg-[#d4ee26] rounded"
              ></div>
            </div>

            <div className="grid grid-cols-12">
              <span className="col-span-11">Raised</span>{" "}
              <span className="col-span-1">Goal</span>
            </div>

            <div className="grid grid-cols-12">
              <span className="col-span-11">${project.totalDonations}</span>{" "}
              <span className="col-span-1">${project.goal}</span>
            </div>
          </div>
        </Typography>
      </CardBody>
      <CardFooter className="flex justify-center gap-7 pt-2">
        <Tooltip content="Like">
          <Typography
            as="a"
            href="#facebook"
            variant="lead"
            color="blue"
            textGradient
          >
            <i className="fab fa-facebook" />
          </Typography>
        </Tooltip>
        <Tooltip content="Follow">
          <Typography
            as="a"
            href="#twitter"
            variant="lead"
            color="light-blue"
            textGradient
          >
            <i className="fab fa-twitter" />
          </Typography>
        </Tooltip>
        <Tooltip content="Follow">
          <Typography
            as="a"
            href="#instagram"
            variant="lead"
            color="purple"
            textGradient
          >
            <i className="fab fa-instagram" />
          </Typography>
        </Tooltip>
      </CardFooter>
    </Card>
  );
}
export default CardEx;
