import React, { useState } from "react";
import FormControl from "@material-ui/core/FormControl";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import PublishIcon from '@material-ui/icons/Publish';
import Typography from '@material-ui/core/Typography';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const useStyles = makeStyles(() => ({
    mt: {
        marginTop: "1rem",
    },
    textarea: {
        padding: "1rem",
        marginTop: "1rem",
        outline: "none",
        border: "1px solid rgba(0, 0, 0, 0.3)",
        background: "transparent",
        borderRadius: "5px"
    },
    text: {
        textAlign: "center",
        fontWeight: "bold",
        marginBottom: '1rem',
    }
}));

function AddNewProject()
{
    const classes = useStyles();

    const [data, setData] = useState("");
    const [skillInputs, setSkillInputs] = useState([""]);

    const [title, setTitle] = useState("");
    const [level, setLevel] = useState("");
    const [desc, setDesc] = useState("");

    const submitBtnStyle = {
        backgroundColor: "#ff5959",
        color: '#FFF',
    }


    const handleChange = (i, event) =>
    {
        const values = [...skillInputs];
        values[i] = event.target.value;
        setSkillInputs(values);
    }

    function handleAdd()
    {
        const values = [...skillInputs];
        values.push("");
        setSkillInputs(values);
    }

    function handleRemove(i)
    {
        const values = [...skillInputs];
        values.splice(i, 1);
        setSkillInputs(values);
    }

    const handleSubmit = async () =>
    {
        if (!title || !level || !desc || !skillInputs[0])
        {
            window.alert("Please fill the form completely.")
        }
        else
        {
            const data = {
                name: title,
                level: level,
                skills: skillInputs,
                description: desc
            }

            try
            {
                const res = await fetch("https://project-zone.ent.asia-south1.gcp.elastic-cloud.com/api/as/v1/engines/project-zone/documents", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer private-zaptmpeyibkdp9x6exesnb98"
                    },
                    body: JSON.stringify(data)
                });

                if (res.status === 200)
                {
                    toast.success('Project added successfully.', {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }
                else
                {
                    toast.error('Sorry!! Your project could not be added.', {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }
                
                setTitle("");
                setLevel("");
                setDesc("");
                setSkillInputs([""]);
            }
            catch (err)
            {
                console.log(err);
            }


        }

    }

    return (
        <div>
            <ToastContainer />
            <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                minHeight="90vh"
            >

                <Box boxShadow={1} width="80%" padding="2rem">
                    <Typography variant="h4" className={classes.text}>
                        Add New Project
                </Typography>
                    <FormControl fullWidth>
                        <TextField
                            label="Project Title"
                            variant="outlined"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required={true}
                        />
                        <TextField
                            className={classes.mt}
                            label="Project Level"
                            variant="outlined"
                            value={level}
                            onChange={(e) => setLevel(e.target.value)}
                            required={true}
                        />

                        {skillInputs.map((field, idx) =>
                        {
                            return (
                                <Box key={idx} display="flex" alignItems="center">

                                    <TextField
                                        className={classes.mt}
                                        label="Project Skill"
                                        variant="outlined"
                                        onChange={e => handleChange(idx, e)}
                                        required={true}
                                    />

                                    <IconButton
                                        color="inherit"
                                        onClick={handleAdd}
                                    >
                                        <AddIcon />
                                    </IconButton>

                                    {
                                        idx > 0 ? (
                                            <IconButton
                                                color="inherit"
                                                onClick={handleRemove}
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        ) :
                                            null
                                    }

                                </Box>
                            );
                        })}
                        <TextareaAutosize
                            aria-label="minimum height"
                            className={classes.textarea}
                            rowsMin={5}
                            placeholder="Description"
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)}
                            required={true}
                        />

                        <Button
                            variant="contained"
                            style={submitBtnStyle}
                            className={classes.mt}
                            startIcon={<PublishIcon />}
                            onClick={handleSubmit}
                        >
                            Submit
                    </Button>
                    </FormControl>
                </Box>
            </Box>
        </div>
    );
}

export default AddNewProject;
