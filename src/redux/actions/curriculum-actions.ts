import axios from "../../../axiosConfig";
import ICurriculum from "../../entities/curriculum";
import { AppActions, IAppAction } from "./actions";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";

/**
 * Handler for Curricula - Axios requests to database for curricula
 * @param {ICurriculum || IAppAction} interface - lists properties of curricula and expected payload
 * @returns {err} - a message confirming response of action, whether it is successful or a failure
 * @author Hannah Mulato
 */

//api call for getting all curricula
export const GetAllCurricula = () => async (dispatch: Dispatch) => {
  try {
    await axios.get("curriculum").then((res) => {
      const curricula: ICurriculum[] = res.data;
      dispatch({
        type: AppActions.UPDATE_CURRICULA,
        payload: {
          skills: [],
          clients: [],
          batches: [],
          demands: [],
          trainers: [],
          curricula,
        },
      });
      return "Retrieved curricula";
    });
  } catch (err) {
    return err;
  }
};

//api call to post a new curriculum
export const PostCurriculum = (curriculum: {
  curriculumname: string;
  createdby: string;
  createdon: string;
  skillIdArr: any[];
}) => async (dispatch: Dispatch<IAppAction>) => {
  try {
    await axios.post("curriculum", curriculum);
    (() => {
      const dispatcher = useDispatch();
      dispatcher(GetAllCurricula());
    })();
    return `${curriculum.curriculumname} has been added.`;
  } catch (err) {
    return err;
  }
};
