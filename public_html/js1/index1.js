/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */

/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */
var jpdbBaseURL = "http://api.login2explore.com:5577";
var jpdbIRL = "/api/irl";
var jpdbIML = "/api/iml";
var projectDBName = "School-DB";
var projectRelationName = "Student";
var connToken = "90932249|-31949270827520432|90954431";

$("#projectId").focus();

function saveRecNo2LS(jsonObj) {
    var lvData = JSON.parse(jsonObj.data);
    localStorage.setItem("recno", lvData.rec_no);
}

function getProjectIdAsJsonObj() {
    var projectId = $("#projectId").val();
    var jsonStr = {
        id : projectId
    };
    return JSON.stringify(jsonStr);
}

function fillData(jsonObj) {
    saveRecNo2LS(jsonObj);
    var record = JSON.parse(jsonObj.data).record;
    $("#projectName").val(record.name);
    $("#assignto").val(record.assignto);
    $("#assigndt").val(record.assigndt);
    $("#deadline").val(record.deadline);
   
}
//done resetform
function resetForm() {
    $("#projectId").val("");
    $("#projectName").val("");
    $("#assignto").val("");
    $("#assigndt").val("");
    $("#deadline").val("");
     $("#projectId").prop("disabled", false);
    $("#save").prop("disabled", true);
    $("#change").prop("disabled", true);
    $("#reset").prop("disabled", true);
    $("#projectId").focus();
}




//checked
function validateData() {
    var projectId, projectName, assignto, assigndt,deadline;
    projectId = $("#projectId").val();
    projectName = $("#projectName").val();
    assignto = $("#assignto").val();
    assigndt = $("#assigndt").val();
    deadline = $("#deadline").val();
   

    if (projectId === "") {
        alert("Project ID missing");
        $("#projectId").focus();
        return "";
    }


    if (projectName === "") {
        alert("Project Name is missing");
        $("#projectName").focus();
        return "";
    }

    if (assignto === "") {
        alert("Assign-To whom is missing");
        $("#assignto").focus();
        return "";
    }

    if (assigndt === "") {
        alert("Assignment date is missing");
        $("#assigndt").focus();
        return "";
    }

    if (deadline === "") {
        alert("Assignment deadline is missing");
        $("#deadline").focus();
        return "";
    }

   

    var jsonStrObj = {
        Id: projectId,
        Name: projectName,
        AssignedDt: assignto,
        Assignedto: assigndt,
        deadline: deadline
        
    };

    return JSON.stringify(jsonStrObj);
}
//checked
function getProject() {
    var ProjectJsonObj = getProjectIdAsJsonObj();
    var getRequest = createGET_BY_KEYRequest(connToken,projectDBName,  projectRelationName, ProjectJsonObj);
    jQuery.ajaxSetup({async: false});
    var resJsonObj = executeCommandAtGivenBaseUrl(getRequest, jpdbBaseURL, jpdbIRL);
    jQuery.ajaxSetup({async: true});

    if (resJsonObj.status === 400) {
        $("#save").prop("disabled", false);
        $("#reset").prop("disabled", false);
        $("#projectName").focus();
    } else if (resJsonObj.status === 200) {
        $("#projectId").prop("disabled", true);
        fillData(resJsonObj);

        $("#change").prop("disabled", false);
        $("#reset").prop("disabled", false);
        $("#projectName").focus();
    }
}






//checked
function saveData() {
    //validate form data

    //create JPDB request string where we need token,DB name, Rel name e.t.c

    //Execute this request

    //Reset the form data 
    var jsonStrObj = validateData();
    if (jsonStrObj === "") {
        return;
    }
    var putRequest = createPUTRequest(connToken, jsonStrObj, projectDBName, projectRelationName);


    //alert(putReqStr);
    jQuery.ajaxSetup({async: false});
    var resJsonObj = executeCommandAtGivenBaseUrl(putRequest, jpdbBaseURL, jpdbIML);

    //alert(JSON.stringify(resultObj));
    jQuery.ajaxSetup({async: true});
    resetForm();
    $("#projectId").focus();
}
//checked
function changeData() {
    $("#change").prop("disabled", true);
    jsonChg = validateData();
    var updateRequest = createUPDATERecordRequest(connToken, jsonChg, projectDBName, projectRelationName, localStorage.getItem("recno"));
    jQuery.ajaxSetup({async: false});
    var resJsonObj = executeCommandAtGivenBaseUrl(updateRequest, jpdbBaseURL, jpdbIML);
    jQuery.ajaxSetup({async: true});
    console.log(resJsonObj);
    resetForm();
    $("#projectId").focus();
}
