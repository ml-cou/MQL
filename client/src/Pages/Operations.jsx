import { UploadOutlined } from "@ant-design/icons";
import { Button, Radio, Drawer, Spin } from "antd";
import TextArea from "antd/es/input/TextArea";
import Upload from "antd/es/upload/Upload";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { BiText } from "react-icons/bi";
import { FaRegFileAudio } from "react-icons/fa6";
import AudioInput from "../Components/AudioInput";
import ShowLog from "../Components/ShowLog";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import CustomMonacoEditor from "../Components/CustomMonacoEditor";
import DefaultDataset from "../Components/DefaultDataset";

function Operations() {
  const [type, setType] = useState("text");
  const [audioTranscript, setAudioTranscript] = useState("");
  const [query, setQuery] = useState("");
  const [rowData, setRowData] = useState();
  const [fileList, setFileList] = useState([]);
  const [data, setData] = useState([]);
  const [showTestFile, setTestFile] = useState(false);
  const [testFileList, setTestFileList] = useState([]);
  const [isloding, setisloading] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false); // State for Drawer visibility

  const handleExecute = async () => {
    setRowData();
    setisloading(true);
    if (!query) {
      toast.error("Query can't be empty");
      return;
    }
    let inputs = query.trim();
    if (inputs[inputs.length - 1] !== ";") {
      toast.error("Invalid Query.");
      return;
    }
    inputs = inputs.split(";");
    inputs = inputs.slice(0, inputs.length - 1);
    inputs = inputs.map((val) => val.trim() + ";");
    for (let input of inputs) {
      if (!input) {
        toast.error("Invalid Query.");
        return;
      }
    }
    try {
      const formData = new FormData();
      formData.append("input", inputs);
      if (fileList && fileList[0] && fileList[0].originFileObj)
        formData.append("file", fileList[0].originFileObj);
      if (testFileList && testFileList[0] && testFileList[0].originFileObj)
        formData.append("test", testFileList[0].originFileObj);

      const res = await fetch("http://localhost:8000/test_url/", {
        method: "POST",
        body: formData,
      });
      let d = await res.json();
      setisloading(false);
      d = d.replaceAll("NaN", "null");

      console.log(d);
      d = JSON.parse(d);

      setData((prev) => [...prev, d]);
    } catch (error) {
      setisloading(false);
      console.log(error);
    }
  };

  return (
    <div className={`max-w-7xl mx-auto`}>
      <Toaster />
      <div className="text-center">
        <Radio.Group
          // size="large"
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="font-semibold"
          buttonStyle="solid"
        >
          <Radio.Button value={"text"} className="!font-secondary">
            <div className="flex items-center gap-2">
              <span className="">Use Text</span>
              <span>
                <BiText size={18} />
              </span>
            </div>
          </Radio.Button>
          <Radio.Button value={"audio"} className="!font-secondary">
            <div className="flex items-center gap-2">
              <span>Use Audio / NLP</span>
              <span>
                <FaRegFileAudio size={18} />
              </span>
            </div>
          </Radio.Button>
        </Radio.Group>
      </div>

      {type === "audio" && (
        <AudioInput
          audioTranscript={audioTranscript}
          setAudioTranscript={setAudioTranscript}
        />
      )}

      <div className="flex">
        {/* Drawer for Default Dataset */}
        <Drawer
          title="Default Dataset"
          placement="left"
          closable={true}
          onClose={() => setDrawerVisible(false)}
          open={drawerVisible}
          width={300}
        >
          <DefaultDataset />
        </Drawer>

        <PanelGroup
          direction="horizontal"
          className="flex-grow flex !flex-row gap-4"
        >
          {type === "text" && (
            <Panel defaultSize={25} minSize={20}>
              <div className="mt-2 flex flex-col bg-white z-50 py-4 overflow-y-auto">
                <h1 className="text-center font-secondary text-lg font-semibold mb-4">
                  Enter your query
                </h1>
                <div className="border rounded box-border border-slate-400">
                  <CustomMonacoEditor
                    query={query}
                    setQuery={setQuery}
                    setTestFile={setTestFile}
                  />
                </div>
                <div className="mt-4">
                  <Upload
                    className="!text-lg"
                    fileList={fileList.map((file) => ({
                      ...file,
                      status: "done",
                    }))}
                    beforeUpload={(file) => {
                      setFileList([
                        { uid: file.uid, name: file.name, status: "done" },
                      ]);
                      return false;
                    }}
                    onChange={(e) => setFileList(e.fileList)}
                  >
                    {fileList.length === 0 && (
                      <Button icon={<UploadOutlined />}>Upload File</Button>
                    )}
                  </Upload>
                  <button
                    onClick={() => setDrawerVisible(true)}
                    className="mt-4 w-28 text-sm border-slate-400 border rounded-lg text-black p-1  shadow-lg  hover:bg-slate-100 hover:shadow-lg"
                  >
                    Default Dataset
                  </button>
                </div>
                {showTestFile && (
                  <div className="mt-4">
                    <Upload
                      className="!text-lg"
                      fileList={testFileList.map((file) => ({
                        ...file,
                        status: "done",
                      }))}
                      beforeUpload={(file) => {
                        setTestFileList([
                          { uid: file.uid, name: file.name, status: "done" },
                        ]);
                        return false;
                      }}
                      onChange={(e) => setTestFileList(e.fileList)}
                    >
                      {testFileList.length === 0 && (
                        <Button icon={<UploadOutlined />}>
                          Upload Test File
                        </Button>
                      )}
                    </Upload>
                  </div>
                )}

                <button
                  className="mt-4 w-28 ml-auto text-lg bg-blue-500 rounded-lg text-white p-1 px-2 font-bold font-secondary shadow-lg hover:bg-blue-900 hover:shadow-lg"
                  onClick={handleExecute}
                >
                  Execute
                </button>
              </div>
            </Panel>
          )}
          <PanelResizeHandle className="border border-dotted border-gray-300" />
          <Panel defaultSize={30} minSize={50}>
            <div className="relative top-8 pb-8 overflow-y-auto">
              <ShowLog data={data} setData={setData} isloding={isloding} />
            </div>
          </Panel>
        </PanelGroup>
      </div>
    </div>
  );
}

export default Operations;
