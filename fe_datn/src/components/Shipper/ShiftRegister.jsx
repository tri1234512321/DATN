import { useContext} from "react";
import { AuthContext } from "../../context/authContext";
import {SocketContext} from "../../context/socketContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../components/Social/axios";

const ShiftRegister = ({job, index}) => {
  const { currentUser } = useContext(AuthContext);
  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery(["shift",job.id], () =>
    makeRequest.get("/get-shifts", {
      params: {access_token: currentUser.access_token, idJob:job.id},
    }).then((res) => {
			// console.log(res);
      return res?.data?.data;
    })
	);

  // console.log(data);

  const createMutation = useMutation(
    () => {
      return makeRequest.post("/create-shift", {
        access_token: currentUser.access_token,
        idJob: job.id,
      });
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["shift",job.id]);
      },
    }
  );

  const deleteMutation = useMutation(
    () => {
      // console.log(data.id,currentUser.access_token);
      return makeRequest.delete("/delete-shift/"+data.id+"?access_token=" + currentUser.access_token);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        // console.log("success");
        queryClient.invalidateQueries(["shift",job.id]);
      },
    }
  );

  const handleCreateShift = () => {
    createMutation.mutate();
  }

  const handleDeleteShift = () => {
    deleteMutation.mutate();
    // console.log(res);
  }

  // console.log(job);
  return (
    <tr key={index}>
      <td className="p-x-">{index}</td>
      <td>{job.typeWork}</td>
      <td>{job.hourlyWage}</td>
      <td>{job.slot}</td>
      <td>{job.occupant}</td>
      <td>{job.startTime}</td>
      <td>{job.endTime}</td>
      <td>{job.date}</td>
      <td>
        {error
          ? ""
          : isLoading
          ? "loading"
          : data ?
            <button
              onClick={handleDeleteShift}
              className="btn-action bg-red-600 hover:bg-red-500 w-[80px]"
            >
              Xoá
            </button> 
          : 
            <button
              className="btn-action bg-lime-500 hover:bg-lime-600 w-[80px]"
              onClick={handleCreateShift}
            >
              Đăng ký
            </button>
        }
      </td>
    </tr>
  )
};

export default ShiftRegister;