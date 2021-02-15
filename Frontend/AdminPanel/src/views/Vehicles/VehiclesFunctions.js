import React from 'react';
import { getFormatedDateFromTimeStamp } from '../../utils/common';

const logTypes = ["Minor", "Major", "Modify", "Check"],
    advanceLogTypes = {
        engine: "Engine Log",
        transmission: "Transmission Log",
        tyres: "Tyre Log",
        drivetrain: "Drivetrain Log",
        break: "Break Log",
        suspensions: "Suspension Log",
        electrical: "Electrical Log",
        interior: "Interior Log",
        exterior: "Exterior Log",
        exhaust: "Exhaust Log",
        others: "Other Log"
    }

export const getDialogBody = (vehicle) => (
    <>
        {
            vehicle
                ?
                <>
                    {
                        processVehicleDetailsContent(vehicle)
                    }
                    {
                        vehicle.logs && vehicle.logs.length > 0
                            ?
                            processLogs(vehicle.logs)
                            :
                            null
                    }
                    {
                        vehicle.old_logs && vehicle.old_logs.length > 0
                            ?
                            processOldLogContent(vehicle.old_logs)
                            :
                            null
                    }
                    {
                        vehicle.faults && vehicle.faults.length > 0
                            ?
                            processFaultsContent(vehicle.faults)
                            :
                            null
                    }
                </>
                :
                null
        }
    </>
)

const processLogs = (logs) => (
    <>
        {
            logs.map((log, index) => (
                <div key={index} className="dialog-details-div">
                    <div>
                        <h5 className="text-left dialog-details-div-heading">{"Log #" + (index + 1)}</h5>
                        <h5 className="text-right dialog-details-div-heading-right-align">{getFormatedDateFromTimeStamp(log.basic_log.created_date)}</h5>
                    </div>
                    <hr />
                    <div>
                        {
                            processLogContent(log)
                        }
                    </div>
                </div>
            ))
        }
    </>
)

const processVehicleDetailsContent = (vehicle) => (
    <div className="dialog-details-div">
        <h5 className="text-left dialog-details-div-heading">Vehicle Details</h5>
        <hr />
        <table className="dialog-details-table">
            <tbody>
                <tr>
                    <td className="dialog-details-table-first-cell text-left">
                        <p>Vehicle Image</p>
                    </td>
                    <td className="dialog-details-table-second-cell text-left">
                        {
                            vehicle.vehicle_image
                                ?
                                <p>
                                    <a href={vehicle.vehicle_image} rel="noopener noreferrer" target="_blank">
                                        {"Vehicle Image"}
                                    </a>
                                </p>
                                :
                                <p className="business-details-ndf-p">No Data Found</p>
                        }
                    </td>
                </tr>
                <tr>
                    <td className="dialog-details-table-first-cell text-left">
                        <p>Model</p>
                    </td>
                    <td className="dialog-details-table-second-cell text-left">
                        {
                            vehicle.custom_model
                                ?
                                <p>{vehicle.custom_model}<i>(custom)</i></p>
                                :
                                vehicle.model
                                    ?
                                    <p>{vehicle.model}</p>
                                    :
                                    <p className="dialog-details-ndf-p">No Data Found</p>
                        }
                    </td>
                </tr>
                <tr>
                    <td className="dialog-details-table-first-cell text-left">
                        <p>Brand</p>
                    </td>
                    <td className="dialog-details-table-second-cell text-left">
                        {
                            vehicle.brand
                                ?
                                <p>{vehicle.brand}</p>
                                :
                                <p className="dialog-details-ndf-p">No Data Found</p>
                        }
                    </td>
                </tr>
                <tr>
                    <td className="dialog-details-table-first-cell text-left">
                        <p>Vehicle type</p>
                    </td>
                    <td className="dialog-details-table-second-cell text-left">
                        {
                            vehicle.vehicle_type
                                ?
                                <p>{vehicle.vehicle_type}</p>
                                :
                                <p className="dialog-details-ndf-p">No Data Found</p>
                        }
                    </td>
                </tr>
                <tr>
                    <td className="dialog-details-table-first-cell text-left">
                        <p>Year</p>
                    </td>
                    <td className="dialog-details-table-second-cell text-left">
                        {
                            vehicle.year
                                ?
                                <p>{vehicle.year}</p>
                                :
                                <p className="dialog-details-ndf-p">No Data Found</p>
                        }
                    </td>
                </tr>
                <tr>
                    <td className="dialog-details-table-first-cell text-left">
                        <p>Created date</p>
                    </td>
                    <td className="dialog-details-table-second-cell text-left">
                        {
                            vehicle.created_date
                                ?
                                <p>{getFormatedDateFromTimeStamp(vehicle.created_date)}</p>
                                :
                                <p className="dialog-details-ndf-p">No Data Found</p>
                        }
                    </td>
                </tr>
            </tbody>
        </table>
    </div >
)

const processLogContent = (log) => (
    Object.entries(log).map(logType => (
        logType[0] === "basic_log"
            ?
            getBasicDetailsContent(logType)
            :
            getAdvanceLogContent(logType)
    ))
)

const getBasicDetailsContent = (logElement) => (
    <div key={logElement[1].id} className="dialog-details-div">
        <h5 className="text-left dialog-details-div-heading">Basic Details</h5>
        <hr />
        <table className="dialog-details-table">
            <tbody>
                <tr>
                    <td className="dialog-details-table-first-cell text-left">
                        <p>Log Type</p>
                    </td>
                    <td className="dialog-details-table-second-cell text-left">
                        {
                            String(logElement[1].log_type)
                                ?
                                <p>{logTypes[Number(logElement[1].log_type)]}</p>
                                :
                                <p className="dialog-details-ndf-p">No Data Found</p>
                        }
                    </td>
                </tr>
                <tr>
                    <td className="dialog-details-table-first-cell text-left">
                        <p>Note</p>
                    </td>
                    <td className="dialog-details-table-second-cell text-left">
                        {
                            logElement[1].note
                                ?
                                <p>{logElement[1].note}</p>
                                :
                                <p className="dialog-details-ndf-p">No Data Found</p>
                        }
                    </td>
                </tr>
                <tr>
                    <td className="dialog-details-table-first-cell text-left">
                        <p>Odometer</p>
                    </td>
                    <td className="dialog-details-table-second-cell text-left">
                        {
                            logElement[1].odometer
                                ?
                                <p>{logElement[1].odometer}</p>
                                :
                                <p className="dialog-details-ndf-p">No Data Found</p>
                        }
                    </td>
                </tr>
                <tr>
                    <td className="dialog-details-table-first-cell text-left">
                        <p>Cost</p>
                    </td>
                    <td className="dialog-details-table-second-cell text-left">
                        {
                            logElement[1].cost
                                ?
                                <p>{logElement[1].cost}</p>
                                :
                                <p className="dialog-details-ndf-p">No Data Found</p>
                        }
                    </td>
                </tr>
                <tr>
                    <td className="dialog-details-table-first-cell text-left">
                        <p>Log date</p>
                    </td>
                    <td className="dialog-details-table-second-cell text-left">
                        {
                            logElement[1].log_date
                                ?
                                <p>{getFormatedDateFromTimeStamp(logElement[1].log_date)}</p>
                                :
                                <p className="dialog-details-ndf-p">No Data Found</p>
                        }
                    </td>
                </tr>
                {
                    logElement[1].service_by === "mechanic"
                        ?
                        <>
                            <tr>
                                <td className="dialog-details-table-first-cell text-left">
                                    <p>Mechanic name</p>
                                </td>
                                <td className="dialog-details-table-second-cell text-left">
                                    {
                                        logElement[1].mechanic_name
                                            ?
                                            <p>{logElement[1].mechanic_name}</p>
                                            :
                                            <p className="dialog-details-ndf-p">No Data Found</p>
                                    }
                                </td>
                            </tr>
                            <tr>
                                <td className="dialog-details-table-first-cell text-left">
                                    <p>Place</p>
                                </td>
                                <td className="dialog-details-table-second-cell text-left">
                                    {
                                        logElement[1].place
                                            ?
                                            <p>{logElement[1].place}</p>
                                            :
                                            <p className="dialog-details-ndf-p">No Data Found</p>
                                    }
                                </td>
                            </tr>
                        </>
                        :
                        null
                }
                <tr>
                    <td className="dialog-details-table-first-cell text-left">
                        <p>Image</p>
                    </td>
                    <td className="dialog-details-table-second-cell text-left">
                        {
                            logElement[1].images && logElement[1].images.length > 0
                                ?
                                getFilesContent(logElement[1].images)
                                :
                                <p className="dialog-details-ndf-p">No Data Found</p>
                        }
                    </td>
                </tr>
                <tr>
                    <td className="dialog-details-table-first-cell text-left">
                        <p>Attachment</p>
                    </td>
                    <td className="dialog-details-table-second-cell text-left">
                        {
                            logElement[1].attachments && logElement[1].attachments.length > 0
                                ?
                                getFilesContent(logElement[1].attachments)
                                :
                                <p className="dialog-details-ndf-p">No Data Found</p>
                        }
                    </td>
                </tr>
                <tr>
                    <td className="dialog-details-table-first-cell text-left">
                        <p>Voice note</p>
                    </td>
                    <td className="dialog-details-table-second-cell text-left">
                        {
                            logElement[1].voices && logElement[1].voices.length > 0
                                ?
                                getFilesContent(logElement[1].voices)
                                :
                                <p className="dialog-details-ndf-p">No Data Found</p>
                        }
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
)

const getAdvanceLogContent = (logElement) => (
    Object.keys(advanceLogTypes).includes(logElement[0])
        ?
        <div key={logElement[1].id} className="dialog-details-div">
            <h5 className="text-left dialog-details-div-heading">{advanceLogTypes[logElement[0]]}</h5>
            <hr />
            <table className="dialog-details-table">
                <tbody>
                    <tr>
                        <td className="dialog-details-table-first-cell text-left">
                            <p>Note</p>
                        </td>
                        <td className="dialog-details-table-second-cell text-left">
                            {
                                logElement[1].note
                                    ?
                                    <p>{logElement[1].note}</p>
                                    :
                                    <p className="dialog-details-ndf-p">No Data Found</p>
                            }
                        </td>
                    </tr>
                    <tr>
                        <td className="dialog-details-table-first-cell text-left">
                            <p>Image</p>
                        </td>
                        <td className="dialog-details-table-second-cell text-left">
                            {
                                logElement[1].images && logElement[1].images.length > 0
                                    ?
                                    getFilesContent(logElement[1].images)
                                    :
                                    <p className="dialog-details-ndf-p">No Data Found</p>
                            }
                        </td>
                    </tr>
                    <tr>
                        <td className="dialog-details-table-first-cell text-left">
                            <p>Attachment</p>
                        </td>
                        <td className="dialog-details-table-second-cell text-left">
                            {
                                logElement[1].attachments && logElement[1].attachments.length > 0
                                    ?
                                    getFilesContent(logElement[1].attachments)
                                    :
                                    <p className="dialog-details-ndf-p">No Data Found</p>
                            }
                        </td>
                    </tr>
                    <tr>
                        <td className="dialog-details-table-first-cell text-left">
                            <p>Voice note</p>
                        </td>
                        <td className="dialog-details-table-second-cell text-left">
                            {
                                logElement[1].voices && logElement[1].voices.length > 0
                                    ?
                                    getFilesContent(logElement[1].voices)
                                    :
                                    <p className="dialog-details-ndf-p">No Data Found</p>
                            }
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        :
        null
)

const processOldLogContent = (old_logs) => (
    old_logs.map((log, index) => (
        <div key={"old_log" + index} className="dialog-details-div">
            <div>
                <h5 className="text-left dialog-details-div-heading">{"Old Log #" + (index + 1)}</h5>
                <h5 className="text-right dialog-details-div-heading-right-align">{getFormatedDateFromTimeStamp(log.basic_log ? log.basic_log.created_date : log.created_date)}</h5>
            </div>
            <hr />
            {
                log.is_normal_log
                    ?
                    processLogContent(log)
                    :
                    getOldLogContent(log)
            }
        </div>
    ))
)

const getOldLogContent = (log) => (
    <table className="dialog-details-table">
        <tbody>
            <tr>
                <td className="dialog-details-table-first-cell text-left">
                    <p>Note</p>
                </td>
                <td className="dialog-details-table-second-cell text-left">
                    {
                        log.note
                            ?
                            <p>{log.note}</p>
                            :
                            <p className="dialog-details-ndf-p">No Data Found</p>
                    }
                </td>
            </tr>
            <tr>
                <td className="dialog-details-table-first-cell text-left">
                    <p>Log date(From)</p>
                </td>
                <td className="dialog-details-table-second-cell text-left">
                    {
                        log.log_date_from
                            ?
                            <p>{getFormatedDateFromTimeStamp(log.log_date_from)}</p>
                            :
                            <p className="dialog-details-ndf-p">No Data Found</p>
                    }
                </td>
            </tr>
            <tr>
                <td className="dialog-details-table-first-cell text-left">
                    <p>Log date(To)</p>
                </td>
                <td className="dialog-details-table-second-cell text-left">
                    {
                        log.log_date_to
                            ?
                            <p>{getFormatedDateFromTimeStamp(log.log_date_to)}</p>
                            :
                            <p className="dialog-details-ndf-p">No Data Found</p>
                    }
                </td>
            </tr>
            {
                log.service_by === "mechanic"
                    ?
                    <>
                        <tr>
                            <td className="dialog-details-table-first-cell text-left">
                                <p>Mechanic name</p>
                            </td>
                            <td className="dialog-details-table-second-cell text-left">
                                {
                                    log.mechanic_name
                                        ?
                                        <p>{log.mechanic_name}</p>
                                        :
                                        <p className="dialog-details-ndf-p">No Data Found</p>
                                }
                            </td>
                        </tr>
                        <tr>
                            <td className="dialog-details-table-first-cell text-left">
                                <p>Place</p>
                            </td>
                            <td className="dialog-details-table-second-cell text-left">
                                {
                                    log.place
                                        ?
                                        <p>{log.place}</p>
                                        :
                                        <p className="dialog-details-ndf-p">No Data Found</p>
                                }
                            </td>
                        </tr>
                    </>
                    :
                    null
            }
            <tr>
                <td className="dialog-details-table-first-cell text-left">
                    <p>Image</p>
                </td>
                <td className="dialog-details-table-second-cell text-left">
                    {
                        log.images && log.images.length > 0
                            ?
                            getFilesContent(log.images)
                            :
                            <p className="dialog-details-ndf-p">No Data Found</p>
                    }
                </td>
            </tr>
            <tr>
                <td className="dialog-details-table-first-cell text-left">
                    <p>Attachment</p>
                </td>
                <td className="dialog-details-table-second-cell text-left">
                    {
                        log.attachments && log.attachments.length > 0
                            ?
                            getFilesContent(log.attachments)
                            :
                            <p className="dialog-details-ndf-p">No Data Found</p>
                    }
                </td>
            </tr>
            <tr>
                <td className="dialog-details-table-first-cell text-left">
                    <p>Voice note</p>
                </td>
                <td className="dialog-details-table-second-cell text-left">
                    {
                        log.voices && log.voices.length > 0
                            ?
                            getFilesContent(log.voices)
                            :
                            <p className="dialog-details-ndf-p">No Data Found</p>
                    }
                </td>
            </tr>
        </tbody>
    </table>
)

const processFaultsContent = (faults) => (
    faults.map((fault, index) => (
        <div key={"fault" + index} className="dialog-details-div">
            <div>
                <h5 className="text-left dialog-details-div-heading">{"Fault #" + (index + 1)}</h5>
                <h5 className="text-right dialog-details-div-heading-right-align">{getFormatedDateFromTimeStamp(fault.created_date)}</h5>
            </div>
            <hr />
            {
                <table className="dialog-details-table">
                    <tbody>
                        <tr>
                            <td className="dialog-details-table-first-cell text-left">
                                <p>Title</p>
                            </td>
                            <td className="dialog-details-table-second-cell text-left">
                                {
                                    fault.title
                                        ?
                                        <p>{fault.title}</p>
                                        :
                                        <p className="dialog-details-ndf-p">No Data Found</p>
                                }
                            </td>
                        </tr>
                        <tr>
                            <td className="dialog-details-table-first-cell text-left">
                                <p>Note</p>
                            </td>
                            <td className="dialog-details-table-second-cell text-left">
                                {
                                    fault.note
                                        ?
                                        <p>{fault.note}</p>
                                        :
                                        <p className="dialog-details-ndf-p">No Data Found</p>
                                }
                            </td>
                        </tr>
                        <tr>
                            <td className="dialog-details-table-first-cell text-left">
                                <p>Prescribed Fix</p>
                            </td>
                            <td className="dialog-details-table-second-cell text-left">
                                {
                                    fault.prescribed_fix
                                        ?
                                        <p>{fault.prescribed_fix}</p>
                                        :
                                        <p className="dialog-details-ndf-p">No Data Found</p>
                                }
                            </td>
                        </tr>
                        <tr>
                            <td className="dialog-details-table-first-cell text-left">
                                <p>Date Noticed</p>
                            </td>
                            <td className="dialog-details-table-second-cell text-left">
                                {
                                    fault.date_noticed
                                        ?
                                        <p>{getFormatedDateFromTimeStamp(fault.date_noticed)}</p>
                                        :
                                        <p className="dialog-details-ndf-p">No Data Found</p>
                                }
                            </td>
                        </tr>
                        <tr>
                            <td className="dialog-details-table-first-cell text-left">
                                <p>Image</p>
                            </td>
                            <td className="dialog-details-table-second-cell text-left">
                                {
                                    fault.images && fault.images.length > 0
                                        ?
                                        getFilesContent(fault.images)
                                        :
                                        <p className="dialog-details-ndf-p">No Data Found</p>
                                }
                            </td>
                        </tr>
                        <tr>
                            <td className="dialog-details-table-first-cell text-left">
                                <p>Attachment</p>
                            </td>
                            <td className="dialog-details-table-second-cell text-left">
                                {
                                    fault.attachments && fault.attachments.length > 0
                                        ?
                                        getFilesContent(fault.attachments)
                                        :
                                        <p className="dialog-details-ndf-p">No Data Found</p>
                                }
                            </td>
                        </tr>
                        <tr>
                            <td className="dialog-details-table-first-cell text-left">
                                <p>Voice note</p>
                            </td>
                            <td className="dialog-details-table-second-cell text-left">
                                {
                                    fault.voices && fault.voices.length > 0
                                        ?
                                        getFilesContent(fault.voices)
                                        :
                                        <p className="dialog-details-ndf-p">No Data Found</p>
                                }
                            </td>
                        </tr>
                    </tbody>
                </table>
            }
        </div>
    ))
)

const getFilesContent = (files) => (
    <ul className="vehicle-details-file-list">
        {
            files.map((file, index) => (
                <li key={index}><a href={file.url} rel="noopener noreferrer" target="_blank">{file.name + " (" + file.size + ")"}</a></li>
            ))
        }
    </ul>
)