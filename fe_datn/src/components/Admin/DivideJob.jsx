import { useContext} from "react";
import { AuthContext } from "../../context/authContext";
import {SocketContext} from "../../context/socketContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../components/Social/axios";
import { toast } from "react-toastify";
import { Buffer } from "buffer";
import Person from "../../assets/social/person.png";

const DevideJob = ({job}) => {
  // console.log(job);
  const { currentUser } = useContext(AuthContext);
  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery(["shifts",job?.id], () =>
    makeRequest.get("/admin-get-shifts", {
      params: {access_token: currentUser.access_token, idJob:job.id},
    }).then((res) => {
			// console.log(res);
      return res?.data?.data;
    })
	);

  // console.log(data);

  const mutation = useMutation(
    (data) => {
      // console.log(data);
      return makeRequest.post("/update-shift", {
        access_token: currentUser.access_token,
        idShift: data.idShift,
        accepted:data.accepted,
        idJob:data.idJob,
        occupant:data.occupant
      });
    },
    {
      onSuccess: (data) => {
        // Invalidate and refetch
        // console.log(data.data);
        queryClient.invalidateQueries(["shifts",job.id]);
        if(data.data.EC===0){
          job.occupant = data.data.occupant;
          queryClient.invalidateQueries(["jobs"]);
          toast.success(data.data.EM);
        } else {
          toast.error(data.data.EM);
        }        
      },
      onError: (error) => {
        console.log(error)
      },
    },
  );

  const handleUpdateShift = (idShift,accepted,idJob,occupant) => {
    let data={idShift,accepted,idJob,occupant}
    mutation.mutate(data);
  }


  // console.log(job);
  return (
    <table className="job-table">
      <thead>
        <tr>
          <th>STT</th>
          <th>Avatar</th>
          <th>Name</th>
          <th>Email</th>
          <th>Phone Number</th>
          <th>Gender</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {error
          ? ""
          : isLoading
          ? "loading"
          : data.map((shift, index) => (
            <tr key={index}>
              <td>{index}</td>
              <td>
              {shift.image
                  ? <img src={Buffer.from(
                                shift.image,
                                "base64"
                                ).toString("binary")} alt=""/>
                  : <img src={Person} alt=""/>
                }
                </td>
              <td>{shift.firstName+" "+shift.lastName}</td>
              <td>{shift.email}</td>
              <td>{shift.phoneNumber}</td>
              <td>{shift.gender}</td>
              <td>
                {shift.accepted ?
                  <button
                    onClick={()=>handleUpdateShift(shift.idShift,0,job.id,-1)}
                    className="btn-action bg-red-600 hover:bg-red-500 w-[80px]"
                  >
                    Hủy
                  </button> 
                : 
                  <button
                    className="btn-action bg-lime-500 hover:bg-lime-600 w-[80px]"
                    onClick={()=>handleUpdateShift(shift.idShift,1,job.id,1)}
                  >
                    Chọn
                  </button>
                } 
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  )
};

export default DevideJob;