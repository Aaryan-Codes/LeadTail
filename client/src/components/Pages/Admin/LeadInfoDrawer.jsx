import { Col, Drawer, Row, Space } from "antd";

const LeadInfoDrawer = ({isLeadInfoOpen,setIsLeadInfoOpen,selectedLead}) => {
  return (
    <>
      <Drawer
        title="Lead Info"
        placement="right"
        closable="false"
        width={450}
        onClose={() => setIsLeadInfoOpen(false)}
        open={isLeadInfoOpen}
        key={"LeadInfo"}
      >
        <Row>
            <Col className="flex flex-col gap-1" span={12}>
            <p>
                <b>Name</b> : {selectedLead.name}
            </p>
            <p>
                <b>Email</b> : {selectedLead.email}
            </p>
            <p>
                <b>Phone No.</b> : {selectedLead.phone}
            </p>
            </Col>

            <Col className="flex flex-col gap-1" span={12}>
            <p><b>Stage</b> : {selectedLead.stage}</p>
            <p><b>Source</b> : {selectedLead.source}</p>
            <p><b>Assigned to</b> : {selectedLead.assigned}</p>
            
            </Col>
        </Row>
        <Row className="py-1">
            <p><b>Comments</b> : {selectedLead.comments}</p>
        </Row>
        
      </Drawer>
    </>
  );
};

export default LeadInfoDrawer;
