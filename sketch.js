var startX = 0;
var startY = 0;
var loomStart = startX*22; 
var rowCount = 0;

var warp_thickness = 4;
var warp_gap = 2;
var weft_thickness = 2;
var vertical_gap = 0.4;
var invert_start = false;

//GUI
var positionYSliders = 90;
var start = false;
var pause = false;
var reset = false;
var weaveOver = false;
var selectImage;
var prevImgInd = 0;
var curImgInd = 0;

//Rect Variables rect(x,y,z,w)
var x = warp_thickness; // Where the loom starts at X
var y = startY; // Where it starts at Y
var z = 19; // Width of the line
var w = 0; // Height of the line
var position = 1; // Number of lines horizontaly

function preload(){
  // blank = loadImage("assets/blank_transparent.png")
  // one = loadImage("assets/one.jpg")
  two = loadImage("assets/two.jpg")
  fourteen = loadImage("assets/three.jpg")
  fifteen = loadImage("assets/four.jpg")
  // five = loadImage("assets/five.jpg")
  // six = loadImage("assets/six.jpg")
  // seven = loadImage("assets/seven.png")
  // eight = loadImage("assets/eight.png")
  // nine = loadImage("assets/untitled-46.png")
  // ten = loadImage("assets/untitled-47.png")
  thirteen = loadImage("assets/untitled.png")
  // fourteen = loadImage("assets/untitled-6.png")
  blank = loadImage("assets/blank_transparent.png")
  one = loadImage("assets/a1.JPG")
  // two = loadImage("assets/a2.JPG")
  three = loadImage("assets/a3.JPG")
  four = loadImage("assets/a4.JPG")
  five = loadImage("assets/a5.JPG")
  six = loadImage("assets/a6.png")
  seven = loadImage("assets/a7.png")
  eight = loadImage("assets/a8.png")
  nine = loadImage("assets/a9.png")
  ten = loadImage("assets/a10.png")
  eleven = loadImage("assets/a11.png")
  twelve = loadImage("assets/a12.png")
  // three = loadImage("assets/three.png")
  img = [blank, one, two, three, four, six, seven, eight, nine, ten, eleven, twelve, thirteen, fourteen, fifteen]
}

var img_start_y_list;
var img_pos_y_list  = [0,0];
for (i = 0; i < img.length; i++){
  img_start_y_list.push(0); // how high up in the image do we continue with
  img_pos_y_list.push(0); // what is the position of y that we start placing
                          // the image when it is reintroduced into the weaving
}

function setup() {
  createCanvas(2000, 6000);
  loadGui()
  warp_thickness = warp_thickness_slider.value();
  warp_gap = warp_gap_slider.value();
  
  // color the warp
  
  drawWarp(warp_thickness, warp_gap);
  


  frameRateDisplayer = createP()
  frameRateDisplayer.position(width/3*2 + 50, 20)
  frameRateDisplayer.style('position','fixed');

  weftThicknessDisplayer = createP()
  weftThicknessDisplayer.position(width/3*2 + 50, 50)
  weftThicknessDisplayer.style('position','fixed');

  verticalGapDisplayer = createP()
  verticalGapDisplayer.position(width/3*2 + 50, 80)
  verticalGapDisplayer.style('position','fixed');

  warpThicknessDisplayer = createP()
  warpThicknessDisplayer.position(width/3*2 + 50, 110)
  warpThicknessDisplayer.style('position','fixed');

  warpGapDisplayer = createP()
  warpGapDisplayer.position(width/3*2 + 50, 140)
  warpGapDisplayer.style('position','fixed');

  imgIndxDisplayer = createP()
  imgIndxDisplayer.position(width/3*2 + 50, 170)
  imgIndxDisplayer.style('position','fixed');

}

// frameRate(20)
function draw() {
  // update the values from the sliders
  
  frameRateDisplayer.html('Frame rate: '+frame_rate_slider.value())
  frameRate(frame_rate_slider.value())
  weftThicknessDisplayer.html('Weft Thickness: ' + weft_thickness_slider.value())
  verticalGapDisplayer.html('Vertical Gap: ' + vertical_gap_slider.value())
  warpThicknessDisplayer.html('Warp Thickness: ' + warp_thickness_slider.value())
  warpGapDisplayer.html('Warp Gap: ' + warp_gap_slider.value())
  
  weft_thickness = weft_thickness_slider.value();
  vertical_gap = vertical_gap_slider.value();
  
  curImgInd = img_ind_slider.value()
  imgIndxDisplayer.html('Image Index Thickness: ' + img_ind_slider.value())
  image(img[curImgInd], width/3*2+50, 225, 120, 120 * img[curImgInd].height/img[curImgInd].width)

  // the new image is different than the previous image
  if (curImgInd != prevImgInd) { 
    // update the curImgInd to 
    img_pos_y_list[curImgInd] = y;
  }
  
  // update frame rate
  frameRate(frame_rate_slider.value())
  
  // WEAVE!
  if (start) {
    // take input from variable
    weft_thickness = weft_thickness_slider.value()
    if (y < height){
      addWeft()
    }
  } else if (pause) {
  } else if (weaveOver) {
    // warp_thickness = warp_thickness_slider.value();
    // warp_gap = warp_gap_slider.value();
    x = warp_thickness;
    y = startY;
    reset = false
  } else if (reset) {
    createCanvas(2000, 6000);
    warp_thickness = warp_thickness_slider.value();
    warp_gap = warp_gap_slider.value();

    //colour warp
    push()
    drawWarp(warp_thickness, warp_gap);
    image(img[curImgInd], width/3*2+50, 205, 120, 120 * img[curImgInd].height/img[curImgInd].width)
    pop()
    // loadGui() 
    x = warp_thickness;
    y = startY;
    reset = false
  }
}


function addWeft() {
  stroke(0, 1, 2, 20 + 0.5 * y);
  let original_invert = invert_start;
  position++;
  while (original_invert == invert_start){
    push()
      beginClip()
    if (y < height) {
      // color & no stroke
      fill(0, 250, 100, 20 + 0.5 * y)
      strokeWeight(0.1)

      
      rect(x, y, warp_thickness + 2 * warp_gap, weft_thickness );
       x = x +  2 * warp_thickness + 2 * warp_gap;
      
    }
    if (x > width/3*2) {
      rowCount++;
      // console.log(rowCount)
      y = y + weft_thickness 
      invert_start = !invert_start
      if (invert_start) {
        x = warp_thickness
      } else {
        x = -warp_gap
      }

      y = y + vertical_gap
    }
    endClip();
    
    
    image(
      img[curImgInd], 
      0, 
      img_pos_y_list[curImgInd], 
      width/3*2, 
      width/3*2 * (img[curImgInd].height)/img[curImgInd].width // -  (img_start_y_list[curImgInd]/img[curImgInd].width)
      )
    pop()
  }  
  // update how much image have been eaten up
  // img_start_y_list[i] = img_start_y_list[i] + weft_thickness + vertical_gap
  prevImgInd = curImgInd
  
}


function drawWarp(warp_thickness, gap) {
  let warp_threads_x_start = 0;
  push()
  beginClip()
  for (i = 0; i < (width/3*2)/(warp_thickness + warp_gap); i++) {
    strokeWeight(0.1)
    rect(
      warp_threads_x_start,
      0,
      warp_thickness,
      height
    );
    warp_threads_x_start = warp_threads_x_start + warp_thickness + warp_gap;
  }
  endClip()
  image(img[2], 0,0, height * img[2].width/img[2].height, height)
  textSize(18)
  fill(0)
  text("* Streamlined cost-effectiveness determination method: FEMA has established streamlined cost-effectiveness determination methods for some hazard mitigation projects and project types. Using one of these methods fulfills the cost-effectiveness requirement if the project meets applicable criteria.      * For projects with a total cost of less than $1,000,000, the subapplicant may provide a narrative that includes qualitative and quantitative data demonstrating the benefits and cost-effectiveness of the project. Total project costs include all project costs, not just the federal share. Instructions for completing a cost- effectiveness narrative may be found on the FEMA BCA website. FEMA will validate the cost effectiveness and estimate a benefit cost ratio of the proposed project during its review.       * Pre-calculated benefits are available for some project types, including acquisitions and elevations. Further details, including application submission requirements, may be found in the HMA Policy and Program Guide and on the FEMA BCA website.   * Benefit-Cost Analysis (BCA) Assistance: FEMA will review hazard mitigation project subapplications during the pre-award process that are competitive and otherwise eligible for selection where a small and impoverished communities as defined in 44 C.F.R. 201.2., federally recognized Tribal government, or subapplication for a hazard mitigation project within or primarily benefiting a Community Disaster Resilience Zone (defined at 42 U.S.C. § 5136(a)(1)) is unable to calculate a BCR to demonstrate cost-effectiveness. FEMA may assist such communities with developing a BCA. Projects with a total cost of less than $1,000,000 that qualify for BCA Assistance under this provision are not required to submit a cost-effectiveness narrative. FEMA has additional guidance for this approach for selected subapplications that may qualify for this consideration. For more information see the FEMA BCA website.   * Benefit-Cost Analysis (BCA): If a streamlined cost-effectiveness determination method does not apply, a BCA is required to validate cost-effectiveness. FEMA has established a set discount rate of 3% to be used in a BCA for hazard mitigation projects for the FY 2023 BRIC and FMA cycles, including FMA Swift Current. FEMA’s BCA Toolkit is available on the FEMA website at https://www.fema.gov/grants/tools/benefit- cost-analysis. Version 6.0 or newer are the only versions FEMA will accept as documentation for demonstrating cost-effectiveness. FEMA encourages the use of the BCA Toolkit to calculate the project BCR; however, applicants and subapplicants may also use a non-FEMA BCA methodology if pre-approved by FEMA in writing.      * All projects not using a streamlined cost-effectiveness determination must demonstrate a BCR of 1.0 or greater to be eligible for funding.       * Even if a streamlined cost-effectiveness determination method applies, applicants and subapplicants may use a BCA to show cost-effectiveness of a project.  b. Acquisition Project Requirements  The subrecipient must provide FEMA with a signed copy of the Statement of Voluntary Participation for each property post-award. The Statement of Voluntary Participation formally documents the Notice of Voluntary Interest and information related to the purchase offer. The Statement of Voluntary Participation is available on the FEMA website at https://www.fema.gov/sites/default/files/documents/fema_form-ff-206-fy-21-124.pdf.  Subrecipients must apply deed-restriction language to all acquired properties to ensure that the property is maintained in perpetuity as open space consistent with the conservation of natural floodplain functions, as agreed to by accepting FEMA mitigation award funding. Deed-restriction language is applied to acquired properties by recording the open space and deed restrictions. The FEMA Model Deed Restriction is available on the FEMA website at https://www.fema.gov/sites/default/files/2020-08/fema_model-deed-restriction.pdf. Subrecipients, as well as recipients and FEMA are responsible for enforcing compliance with open space restrictions pursuant to 44 C.F.R. Part 80 requirements.  c. National Environmental Policy Act Requirements for Mitigation Projects  Applicants and subapplicants applying for hazard mitigation projects must provide information needed to comply with the National Environmental Policy Act (NEPA) (42 U.S.C. §§ 4321–4370h), the Council on Environment Quality’s implementing regulations at 40 C.F.R. parts 1500-1508, and the related DHS and FEMA instructions and directives (i.e.,  DHS Directive 023-01, 12 DHS Instruction Manual 023-01-001-01,13 FEMA Directive 108-1, 14 and FEMA Instruction 108-1-1,15 which can be accessed at https://www.fema.gov/emergency-managers/practitioners/environmental-historic/laws/ehp- directive-instruction). The required information is included in the subapplication in MT eGrants. Environmental Planning and Historic Preservation (EHP) Job Aids and Supplements are available on the FEMA website at https://www.fema.gov/grants/guidance- tools/environmental-historic. The required information is included in the subapplication in MT eGrants.  12. Intergovernmental Review  An intergovernmental review may be required. Applicants must contact their state’s Single Point of Contact (SPOC) to comply with the state’s process under Executive Order 12372 (See https://www.archives.gov/federal-register/codification/executive-order/12372.html;  www.whitehouse.gov/wp-content/uploads/2020/04/SPOC-4-13-20.pdf.  13. Funding Restrictions and Allowable Costs  All costs charged to awards covered by this NOFO must comply with the Uniform Administrative Requirements, Cost Principles, and Audit Requirements at 2 C.F.R. Part 200, unless otherwise indicated in the NOFO, or the terms and conditions of the award. This includes, among other requirements, that costs must be incurred, and products and services must be delivered, within the period of performance of the award. See 2 C.F.R. § 200.403(h) (referring to budget periods, which for FEMA awards is the same as the period of performance).  In general, the Cost Principles establish standards for the allowability of costs, provide detailed guidance on the cost accounting treatment of costs as direct or administrative costs, and set forth allowability principles for selected items of cost. More specifically, except as otherwise stated in this NOFO, the terms and condition of an award, or other program materials, costs charged to awards covered by this NOFO must be consistent with the Cost Principles for Federal Awards located at 2 C.F.R. Part 200, Subpart E. In order to be allowable, all costs charged to a FEMA award or applied to the cost share must be reasonable in nature and amount and allocable to the particular FEMA award.  Additionally, all costs charged to awards must comply with the grant program’s applicable statutes, policies, requirements in this NOFO as well as with the terms and conditions of the award. If FEMA staff identify costs that are inconsistent with any of these requirements, these costs may be disallowed, and FEMA may recover funds as appropriate, consistent with applicable laws, regulations, and policies.   As part of those requirements, grant recipients and subrecipients may only use federal funds or funds applied to a cost share for the purposes set forth in this NOFO and the terms and conditions of the award, and those costs must be consistent with the statutory authority for the award.  Grant funds may not be used for matching funds for other federal grants/cooperative agreements, lobbying, or intervention in federal regulatory or adjudicatory proceedings. In addition, federal funds may not be used to sue the federal government or any other government entity.  Applicants should analyze the cost benefits of purchasing versus leasing equipment, especially high-cost items and those subject to rapid technical advances. Large equipment purchases must be identified and explained. For more information regarding property management standards for equipment and federal procurement requirements, please reference 2 C.F.R. Part 200, available at https://www.ecfr.gov/cgi-bin/text-idx?tpl=/ecfrbrowse/Title02/2cfr200_main_02.tpl  More detailed information is available in the 2023 Hazard Mitigation Assistance Program and Policy Guide.  a. Prohibitions on Expending FEMA Award Funds for Covered Telecommunications Equipment or Services  Recipients and subrecipients of FEMA federal financial assistance are subject to the prohibitions described in section 889 of the John S. McCain National Defense Authorization Act for Fiscal Year 2019 (FY 2019 NDAA), Pub. L. No. 115-232 (2018) and 2 C.F.R. §§ 200.216, 200.327, 200.471, and Appendix II to 2 C.F.R. Part 200. Beginning August 13, 2020, the statute – as it applies to FEMA recipients, subrecipients, and their contractors and subcontractors – prohibits obligating or expending federal award funds on certain telecommunications and video surveillance products and contracting with certain entities for national security reasons.  Guidance is available at FEMA Policy #405-143-1 - Prohibitions on Expending FEMA Award Funds for Covered Telecommunications Equipment or Services  Additional guidance is available at Contract Provisions Guide: Navigating Appendix II to Part 200 - Contract Provisions for Non-Federal Entity Contracts Under Federal Awards (fema.gov).  Effective August 13, 2020, FEMA recipients and subrecipients may not use any FEMA funds under open or new awards to:  * Procure or obtain any equipment, system, or service that uses covered telecommunications equipment or services as a substantial or essential component of any system, or as critical technology of any system;   * Enter into, extend, or renew a contract to procure or obtain any equipment, system, or service that uses covered telecommunications equipment or services as a substantial or essential component of any system, or as critical technology of  * any system; or • Enter into, extend, or renew contracts with entities that use covered  * telecommunications equipment or services as a substantial or essential component of any system, or as critical technology as part of any system.   b. Pre-Award Costs  Pre-award costs directly related to developing the FMA grant application or subapplication that are incurred prior to the date of the grant award are allowed subject to FEMA approval at time of award. Such costs may have been incurred prior to application submission, for example gathering data to be used for preparing environmental reviews required by NEPA or developing a BCA (see Section D, Application and Submission Information), preparing design specifications, or conducting workshops or meetings related to development and submission of subapplications. To be eligible for FMA funding, pre-award costs must be identified in the individual line item in the cost estimate of the subapplication.  Pre-award costs may be cost shared or applicants and subapplicants may identify them as their non-federal cost share (see Section C, Eligibility Information, Cost Share or Match).  Costs associated with implementation of proposed projects in the submitted grant application or subapplication that are incurred prior to the date of the grant award are not allowed. Activities initiated or completed prior to the date of the grant award are generally not eligible.   • However, per the Hazard Eligibility and Local Projects (HELP) Act, FEMA may provide assistance for certain acquisition and demolition projects when implementation started after January 3, 2023. In order to be eligible, the project must also: (1) qualify for a categorical exclusion under NEPA; (2) be compliant with applicable floodplain management and protection of wet land regulations and criteria; and (3) not require consultation under any other environmental or historic preservation law or regulation or involve any extraordinary circumstances. An entity seeking assistance under the HELP Act must comply with all other applicable HMA and federal requirements (see Pub. L. No. 117-332).  If any pre-award activities related to developing an FMA grant application or subapplication result in ground disturbance, the applicant or subapplicant must comply with all applicable federal, state, and local laws and regulations, and obtain any applicable environmental permits and clearances. The applicant or subapplicant must ensure monitoring of ground disturbance, and if any potential archaeological resources are discovered, work will immediately cease, and the appropriate state authority will be notified.  Applicants and subapplicants who are not awarded awards or subawards will not receive reimbursement for the corresponding pre-award costs.  c. Management Costs  In addition to funding received as described in Section B.1, Available Funding for the NOFO, applicants and subapplicants are eligible to receive management costs (direct and indirect administrative costs pursuant to 2 C.F.R. Part 200, Subpart E).  Subapplicants may submit up to 5% of the total budget of the subapplication for management costs. The total budget refers to the sum of non-federal and federal shares of the proposed subapplication. Subapplicants must use subapplicant management costs to manage their subaward activities. Subapplicant management costs will not exceed 5% of the total subapplication budget. Subapplicant management cost activities must be added to the Scope of Work section and identified in the Cost Estimate section of subapplications in MT eGrants.  Applicants may submit up to 10% of the application budget (with the total budget including subapplicant management costs) for applicants to administer and manage award and subaward activities. Applicants’ management costs will be calculated using the total sum of all non-federal and federal cost shares (the composite of all projects’ cost share). FEMA will verify and calculate the management costs based on the applications and subapplications final selections.  Applicant requests for management costs must be submitted in a separate management costs subapplication in MT eGrants (see Section D, Application and Submission Information, Content and Form of Application Submission).  The subapplicant management costs (up to 5%) must be added to the subapplication total budget prior to the calculation of the applicant management costs (up to 10%). Applicant management costs will not exceed 10% of the total application budget.  If the applicant is also implementing the award as the subapplicant, the applicant is allowed to claim subapplicant (up to 5%) and applicant management costs (up to 10%). Uses of the applicant management costs must be distinct from subapplicant management costs and must adhere to the stated uses, even if being used by the same entity. The total management costs still will not exceed 15% of the total award. Management costs are governed by 44 C.F.R. Part 77. Management costs are any indirect costs, any direct administrative costs, and other administrative expenses that are reasonably incurred in administering an award or subaward. Eligible applicant or subapplicant management cost activities may include:   • Solicitation, review, and processing of subapplications and subawards    • Subapplication development and technical assistance to subapplicants regarding  feasibility and effectiveness and BCA    • Geocoding hazard mitigation projects identified for further review by FEMA    • Delivery of technical assistance (e.g., plan reviews, planning workshops, training) to  support the implementation of hazard mitigation activities    • Managing awards (e.g., quarterly reporting including closeout)    • Technical monitoring (e.g., site visits, technical meetings)    • Purchase of equipment, per diem and travel expenses, and professional development  that is directly related to the implementation of HMA programs    • Staff salary costs directly related to performing the activities listed above   d. Indirect Facilities & Administrative (F&A) Costs  Indirect costs of administering the FMA program are eligible as part of the 10 percent management costs for the recipient or the 5 percent management costs of the subrecipient, but in no case do they make the recipient eligible for additional management costs that exceed the statutory caps. In addition, all costs must be in accordance with the provisions of 2 C.F.R. parts 200 and 3002.  Indirect costs are allowable under this program as described in 2 C.F.R. Part 200, including 2 C.F.R. § 200.414. Applicants with a current negotiated indirect cost rate agreement that desire to charge indirect costs to an award must provide a copy of their negotiated indirect cost rate agreement at the time of application. Not all applicants are required to have a current negotiated indirect cost rate agreement. Applicants that are not required by 2 C.F.R. Part 200 to have a negotiated indirect cost rate agreement but are required by 2 C.F.R. Part 200 to develop an indirect cost rate proposal must provide a copy of their proposal at the time of application. Applicants who do not have a current negotiated indirect cost rate agreement (including a provisional rate) and wish to charge the de minimis rate must reach out to the Grants Management Specialist for further instructions. Applicants who wish to use a cost allocation plan in lieu of an indirect cost rate must also reach out to the Grants Management Specialist for further instructions.  Subapplicants are not required to submit negotiated indirect cost rate agreements or proposals directly to FEMA, but they may need to submit them to the applicable applicants per 2 C.F.R. § 200.332.  E. ApplicationReviewInformation 1. Application Evaluation Criteria  a. Programmatic Criteria  FEMA will review subapplications submitted by each applicant to ensure:   • Eligibility of the applicant and subapplicant;    • Eligibility of proposed activities and costs;    • Completeness of the subapplication;    • Cost-effectiveness, alternative cost-effectiveness, and engineering feasibility of  mitigation projects; or expected savings to the National Flood Insurance Fund (NFIF)  from expected avoided damages through acquisition or relocation activity;    • Eligibility and availability of non-federal cost share;    • Alignment with approved State Mitigation Plan and Local and/or Tribal Hazard  Mitigation Plan;    • Conformance with all applicable Federal, State, Tribal and local environmental and  historic preservation laws and regulations;    • Proposed project will solve a problem independently, or constitute a functional  portion of a long-term solution where there is assurance that the project will be  completed; and    • Requested funds do not duplicate benefits available from another source for the same  purpose or assistance that another federal agency or program has more primary authority to provide.  For more detailed information, see the 2023 Hazard Mitigation Assistance Program and Policy Guide.   b. Financial Integrity Criteria  Prior to making a federal award, FEMA is required by 31 U.S.C. § 3354, as enacted by the Payment Integrity Information Act of 2019, Pub. L. No. 116-117 (2020); 41 U.S.C. § 2313; and 2 C.F.R. § 200.206 to review information available through any Office of Management and Budget (OMB)-designated repositories of governmentwide eligibility qualification or financial integrity information, including whether the applicant is suspended or debarred. FEMA may also pose additional questions to the applicant to aid in conducting the pre-award risk review. Therefore, application evaluation criteria may include the following risk-based considerations of the applicant:  i. Financial stability. ii. Quality of management systems and ability to meet management standards. iii. History of performance in managing federal award. iv. Reports and findings from audits. v. Ability to effectively implement statutory, regulatory, or other requirements.  c. Supplemental Financial Integrity Criteria and Review  Prior to making a federal award where the anticipated total federal share will be greater than the simplified acquisition threshold, currently $250,000:   • FEMA is required to review and consider any information about the applicant, including information on the applicant’s immediate and highest-level owner, subsidiaries, and predecessors,16 if applicable, that is in the designated integrity and performance system accessible through the System for Award Management (SAM), which is currently the Federal Awardee Performance and Integrity Information System (FAPIIS).    • An applicant, at its option, may review information in FAPIIS and comment on any information about itself that a federal awarding agency previously entered.    • FEMA will consider any comments by the applicant, in addition to the other information in FAPIIS, in making a judgment about the applicant’s integrity, business ethics, and record of performance under federal awards when completing the review of risk posed by applicants as described in 2 C.F.R. § 200.206.   2. Review and Selection Process  a. Selection  FEMA will select eligible subapplications up to at least the available funding amount of $300 million. The FEMA Administrator may authorize the usage of additional BIL funding to increase funding of FMA Swift Current.  All identified properties in a subapplication must be NFIP defined or FMA defined SRL, RL, or deemed Substantially Damaged after the applicant’s disaster declaration * incident period start * date, as referenced in Section C.3 Other Eligibility Criteria. If a subapplication includes a property that is not SRL, RL, or deemed Substantially Damaged as of the applicant’s disaster declaration * incident period start * date, FEMA will remove the property from the subapplication prior to selection.  FEMA may lower the priority of subapplications where the average elevation federal cost share is greater than $250,000 for all single dwelling units or the average acquisition federal cost share is greater than $750,000 for all single dwelling units.  FEMA may increase the priority of properties from subapplications if the building value of a single-family dwelling is less than $750,000, according to best available data, to ensure maximization of the number of NFIP-insured properties selected for mitigation projects in accordance with 44 C.F.R. § 77.4(a). To determine the building value of a single-family dwelling, homeowners can refer to the Replacement Cost Value (RCV)17 documented in the most recent claim. If no RCV is provided, then homeowners can refer to the Actual Cash  16 As defined in 2 C.F.R. Part 25, specifically § 25.447: Predecessor means a non-federal entity that is replaced by a successor and includes any predecessors of the predecessor. 17 The cost to replace property with the same kind of material and construction without deduction for depreciation.    •     •    FY 2023 FMA Swift Current NOFO Back to the Top    •   37  Value (ACV)18 as documented on the most recent claim. If an RCV or ACV for the structure is not available or includes errors, FEMA will evaluate properties on a case-by-case basis for removal from the subapplication.  If the structure does not have an RCV, then FEMA will consider the Actual Cash Value (ACV) of the structure, as listed on the most current claim of the property. If the structure has neither RCV nor ACV, FEMA will consider the assessed market value.  Subapplications will be reviewed and selected on a rolling basis as subapplications are submitted to FEMA during the applicant’s eligibility period.  At the end of the applicant’s eligibility period, the applicant allocation will expire. At this time, any unused funds within the applicant allocation that are not tied to projects identified for further review will be returned to FY 2023 FMA Swift Current available funds.  Sec. 223 from Executive Order 14008: “Tackling the Climate Crisis at Home and Abroad” establishes the Justice40 Initiative, which sets a goal that 40 percent of the overall benefits of certain Federal investments flow to disadvantaged communities. Pursuant to this effort and to maximize the number of NFIP-insured properties receiving assistance in accordance with 44 C.F.R. § 77.4(a), FEMA will use the Climate and Economic Justice Screening Tool (CEJST) to identify properties located in a Justice40 community, also referred as a disadvantaged community, in order to prioritize assistance for those communities. Applicants and subapplicants should also undertake ongoing and meaningful community engagement in the implementation of Justice40 to identify and design efforts that will prioritize and maximize benefits for disadvantaged communities through the implementation of these projects. To help realize these benefits, applicants and subapplicants could also consider including local and economic hiring practices or contracting with small, disadvantaged businesses rooted in disadvantaged communities to help implement the work that will be conducted.  FEMA may select a subapplication out of prioritized order or rolling order based on one or more of the following factors:   • Availability of funding    • Duplication of subapplications    • Program priorities and policy factors    • Other pertinent information, such as flood insurance claims history, substantial  damage status, structure value, etc.  Subapplications that have made it through the selections process but will not be funded due to the limited availability of FMA funding may be reviewed by other FEMA grant programs for eligibility and alternative funding. Additional information may be requested to ensure all applicable programmatic eligibility criteria are met.  18 The cost to replace an insured item of property at the time of loss, less the value of its physical depreciation. FY 2023 FMA Swift Current NOFO Back to the Top         38  b. Selection Status  After the review has been completed as described in Section E, Application Review Information, FEMA will designate the selected project subapplications as one of the following three statuses:   • Identified for Further Review (IFFR) – Applicants with project subapplication(s) that are Identified for Further Review that submitted a management costs subapplication in their FMA grant application (see Section D.9 Content and Form of Application Submission) are eligible to receive applicant management costs not to exceed 10 percent of the selected project subapplications.    • Not Selected – This means the subapplication is eligible but was not selected due to a lack of available funding under the applicable subtotals.    • Does Not Meet HMA Requirements – This means the subapplication does not satisfy the eligibility and completeness requirements.   c. Request for Reconsideration  At its discretion, and at the request of the applicant or subapplicant (through the applicant), FEMA may reconsider a decision regarding any subapplication that is Not Selected or Does Not Meet HMA Requirements only where there is an indication of substantive technical or procedural error that may have influenced FEMA’s decision. There will be no reconsideration regarding the amount of applicant management costs. Applicants must send requests for reconsideration based on technical or procedural error to the FEMA Regional Office within 60 days of the posting of subapplication status. Subapplicants should contact their applicant agency regarding reconsideration requests, so that the applicant may submit it to the FEMA Regional Office on their behalf. Contact information for each State Hazard Mitigation Officer is provided at State Hazard Mitigation Officers | FEMA.gov.  The FEMA Regional Office will review reconsideration requests received from applicants and submit the Regional recommendation to FEMA Headquarters. FEMA Headquarters will make a final determination to overturn or uphold the original decision and send the response to the applicant.  Prior to making an award, FEMA will evaluate applicants to determine the level of risk when there is a history of failure to comply with general or specific terms and conditions of a federal award or failure to meet the expected performance goals. If FEMA determines that a federal award will be made, special conditions that correspond to the degree of risk assessed may be applied to the award, as specified in Part VI, Section B: Risk Assessment Prior to PDM and FMA award, of the 2023 Hazard Mitigation Assistance Program and Policy Guide,  F. Federal Award Administration Information 1. Notice of Award  Before accepting the award, recipient should carefully read the award package. The award package includes instructions on administering the grant award and the terms and conditions associated with responsibilities under federal awards. Recipients must accept all conditions         FY 2023 FMA Swift Current NOFO Back to the Top     39  in this NOFO as well as any specific terms and conditions in the Notice of Award to receive an award under this program.  FEMA will provide the federal award package to the applicant electronically via MT eGrants. Award packages include an Award Letter, Summary Award Memo, Agreement Articles, and Obligating Document. An email notification of the award package will be sent through MT eGrants.  Recipients must accept their awards no later than 30 days from the award date. The recipient shall notify FEMA of its intent to accept and proceed with work under the award through the MT eGrants system.  Funds will remain on hold until the recipient accepts the award through the MT eGrants system and all other conditions of the award have been satisfied or until the award is otherwise rescinded. Failure to accept a grant award within the specified timeframe may result in a loss of funds.  When FEMA obligates funds for a grant to an applicant, the applicant and subapplicant are denoted as recipient and subrecipient, respectively. The recipient and subrecipient agree to abide by the grant award term and conditions as set forth in the Articles of Agreement provided in the award package. Recipients must accept all conditions in this NOFO as well as any Special Terms and Conditions.  FEMA or DHS may initiate a formal evaluation of programs, projects, or activities supported by this grant. By accepting grant funds, recipients agree to participate in the evaluation, which may include analysis of individuals who benefit from the grant (such as property owners), and providing access to program operating personnel and participants, as specified by the evaluator(s), including after the POP.  2. Administrative and National Policy Requirements  In addition to the requirements of in this section and in this NOFO, FEMA may place specific terms and conditions on individual awards in accordance with 2 C.F.R. Part 200.  a. DHS Standard Terms and Conditions  All successful applicants for DHS grant and cooperative agreements are required to comply with DHS Standard Terms and Conditions, which are available online at: DHS Standard Terms and Conditions.  The applicable DHS Standard Terms and Conditions will be those in effect at the time the award was made. What terms and conditions will apply for the award will be clearly stated in the award package at the time of award.  b. Ensuring the Protection of Civil Rights  As the Nation works towards achieving the National Preparedness Goal, it is important to continue to protect the civil rights of individuals. Recipients and subrecipients must carry out their programs and activities, including those related to the building, sustainment, and         FY 2023 FMA Swift Current NOFO Back to the Top     40  delivery of core capabilities, in a manner that respects and ensures the protection of civil rights for protected populations.  Federal civil rights statutes, such as Section 504 of the Rehabilitation Act of 1973 and Title VI of the Civil Rights Act of 1964, along with FEMA regulations, prohibit discrimination on the basis of race, color, national origin, sex, religion, age, disability, limited English proficiency, or economic status in connection with programs and activities receiving federal financial assistance from FEMA.  The DHS Standard Terms and Conditions include a fuller list of the civil rights provisions that apply to recipients. These terms and conditions can be found in the DHS Standard Terms and Conditions. Additional information on civil rights provisions is available at https://www.fema.gov/about/offices/equal-rights/civil-rights.  Monitoring and oversight requirements in connection with recipient compliance with federal civil rights laws are also authorized pursuant to 44 C.F.R. Part 7.  c. Environmental Planning and Historic Preservation (EHP) Compliance  As a federal agency, FEMA is required to consider the effects of its actions on the environment and historic properties to ensure that all activities and programs funded by FEMA, including grant-funded projects, comply with federal EHP laws, Executive Orders (EO), regulations, and policies, as applicable.  All FEMA actions, including grant-funded actions, must comply with National Flood Insurance Program criteria or any more restrictive federal, state, or local floodplain management standards or building code (44 C.F.R. § 9.11(d)(6)).  All FEMA-funded non-critical actions in 1% annual chance floodplains (also known as 100- year floodplains) that involve structure elevation, mitigation reconstruction, dry floodproofing, new construction, repair of substantial damage or substantial improvement of structures must be elevated or floodproofed, at a minimum, to the lower of:   • Two feet above the 1% annual chance flood elevation (also known as the base flood elevation), in accordance with the Federal Flood Risk Management Standard (FFRMS) “Freeboard Value Approach” (FVA); or    • The 0.2% annual chance flood elevation. Where 0.2% annual chance flood elevations are not available, such actions must be elevated to at least two feet above the 1% annual chance flood elevation.  All FEMA-funded critical actions in 1% annual chance floodplains or 0.2% annual chance floodplains (also known as 500-year floodplains) that involve structure elevation, mitigation reconstruction, dry floodproofing, new construction, repair of substantial damage or substantial improvement of structures must be elevated, at a minimum, to the higher of:                In accordance with civil rights laws and regulations, recipients and subrecipients must ensure   the consistent and systematic fair, just, and impartial treatment of all individuals, including   individuals who belong to underserved communities that have been denied such treatment.   FY 2023 FMA Swift Current NOFO Back to the Top     41   • Three feet above the 1% annual chance flood elevation; or    • The 0.2% annual chance flood elevation. Where 0.2% annual chance flood  elevations are not available, such actions must be elevated to at least three feet above the 1% annual chance flood elevation.  See Executive Order 11988, Floodplain Management, as amended by Executive Order 13690, Establishing a Federal Flood Risk Management Standard and a Process for Further Soliciting and Considering Stakeholder Input, and the 2023 Hazard Mitigation Assistance Program and Policy Guide.  Recipients and subrecipients proposing projects that have the potential to impact the environment, including, but not limited to, the construction of communication towers, modification or renovation of existing buildings, structures, and facilities, or new construction including replacement of facilities, must participate in the FEMA EHP review process. The EHP review process involves the submission of a detailed project description along with any supporting documentation requested by FEMA in order to determine whether the proposed project has the potential to impact environmental resources or historic properties.  In some cases, FEMA is also required to consult with other regulatory agencies and the public in order to complete the review process. Federal law requires EHP review to be completed before federal funds are released to carry out proposed projects. FEMA may not be able to fund projects that are not incompliance with applicable EHP laws, regulations Executive Orders, and policies.  DHS and FEMA EHP policy is found in directives and instructions available on the FEMA.gov EHP page, the FEMA website page that includes documents regarding EHP responsibilities and program requirements, including implementation of the National Environmental Policy Act and other EHP laws, regulations, and Executive Orders. Individual FEMA programs have separate procedures to conduct and document EHP review. Guidance for individual grant programs is available from applicable program offices.  Presidential EO 11988: Floodplain Management and EO 11990: Protection of Wetlands require that all federal actions in or affecting the floodplain or wetlands be reviewed for opportunities to relocate, and be evaluated for social, economic, historical, environmental, legal and safety considerations. FEMA’s regulations at 44 C.F.R. Part 9 implement the EOs and require an 8-step review process if a proposed action is located in a floodplain or wetland consistent with 44 C.F.R. § 9.6.  The regulation also requires that the federal agency provide public notice of the proposed action at the earliest possible time to provide the opportunity for public involvement in the decision-making process (44 C.F.R. § 9.8). Where there is no opportunity to relocate the federal action, FEMA is required to undertake a detailed review to determine what measures can be taken to minimize future damages to the floodplain or wetland.  Through this NOFO, FEMA is giving notice of projects that may be funded under the FMA program, consistent with the requirements of Section 9.8. The public is invited to participate          FY 2023 FMA Swift Current NOFO Back to the Top     42  in the process of identifying alternatives to locating a proposed project in the floodplain or wetland and analyzing the impacts of the alternatives on the floodplain or wetland. Comments may be provided by emailing ehphelpline@fema.dhs.gov within 15 days of its issuance. While analyzing alternatives, FEMA may determine there are no practicable alternatives to carrying out the proposed work within the floodplain or wetland. Relocating facilities may not be practicable and would adversely impact affected communities socially and economically.  In addition, no alternative actions may be practicable that serve the same purpose and have less potential to affect or be affected by the floodplain. The no action option would not be appropriate as it would fail to meet the purpose and need of the community. In the course of developing project proposals, subsequent public notices will be published, if necessary, as more specific information becomes available.  d. Construction Project Requirements  Acceptance of federal funding requires FEMA, the recipient, and any subrecipients to comply with all federal, state, and local laws and regulations prior to the start of any construction activity. Failure to obtain all appropriate federal, state, and local environmental permits and clearances may jeopardize federal funding. Also:   • Any change to the approved scope of work will require re-evaluation by FEMA for compliance with the NEPA and other laws and Executive Orders.    • If ground-disturbing activities occur during construction, the recipient and any subrecipients must ensure monitoring of ground disturbance, and if any potential archaeological resources are discovered, the subrecipient will immediately cease construction in that area and notify the recipient and FEMA.  o All mitigation projects must be in conformance with flood insurance requirements. This means that: (a) the project must be in a jurisdiction participating in the National Flood Insurance Program (NFIP); and (b) the property owner(s) must obtain and maintain NFIP flood insurance policy for the life of the structure, regardless of transfer of ownership, in an amount at least equal to the project cost or to the maximum limit of coverage made available with respect to the mitigated property, whichever is less.  3. Reporting  Recipients are required to submit various financial and programmatic reports as a condition of award acceptance. Future awards and funds drawdown may be withheld if these reports are delinquent.   a. Financial Reporting Requirements  I. FEDERAL FINANCIAL REPORT (FFR)  Recipients must report obligations and expenditures through the FFR form (SF-425) to FEMA.  Recipients may review the Federal Financial Reporting Form (FFR) (SF-425) at  https://www.grants.gov/web/grants/forms/post-award-reporting-forms.html#sortby=1      FY 2023 FMA Swift Current NOFO Back to the Top     43  Recipients must file the FFR electronically using the Payment and Reporting Systems (PARS).  II. FFR REPORTING PERIODS AND DUE DATES  An FFR must be submitted quarterly throughout the POP, including partial calendar quarters, as well as in periods where no grant award activity occurs. The final FFR is due within 120 calendar days after the end of the POP. Future awards and fund drawdowns may be withheld if these reports are delinquent, demonstrate lack of progress, or are insufficient in detail.  Except for the final FFR due at 120 days after the end of the POP for purposes of closeout, the following reporting periods and due dates apply for the FFR:  Reporting Period Report Due Date October 1 – December 31 January 1 – March 31 April 1 – June 30 July 1 – September 30  January 30 April 30 July 30 October 30                        b. Programmatic Performance Reporting Requirements  I. PERFORMANCE PROGRESS REPORT (PPR)  In addition to the FFR reports, Recipients must report on the progress of the grant on a quarterly basis to DHS/FEMA using the Quarterly Performance Report in MT eGrants. The Quarterly Performance Reports must be submitted electronically in FEMA’s grant application system throughout the period of performance, even for periods where no grant Award activity occurs. Reports are due within 30 days from the end of the first federal quarter following the initial grant Award and within 30 days after every subsequent quarter until the grant ends.  c. Closeout Reporting Requirements  I. CLOSEOUT REPORTING  Within 120 calendar days after the end of the period of performance for the prime award or after an amendment has been issued to close out an award before the original POP ends, recipients must liquidate all financial obligations and must submit the following:  i. The final request for payment, if applicable. ii. The final FFR (SF-425). iii. The final progress report detailing all accomplishments, including a narrative  summary of the impact of those accomplishments throughout the period of  performance. v. Other documents required by this NOFO, terms and conditions of the award, or other  FEMA guidance. FY 2023 FMA Swift Current NOFO Back to the Top     44  In addition, pass-through entities are responsible for closing out their subawards as described in 2 C.F.R. § 200.344; subrecipients are still required to submit closeout materials within 90 calendar days of the period of performance end date. When a subrecipient completes all closeout requirements, pass-through entities must promptly complete all closeout actions for subawards in time for the recipient to submit all necessary documentation and information to FEMA during the closeout of the prime award.  After the prime award closeout reports have been reviewed and approved by FEMA, a closeout notice will be completed to close out the grant. The notice will indicate the period of performance as closed, list any remaining funds that will be deobligated, and address the requirement of maintaining the grant records for at least three years from the date of the final FFR. The record retention period may be longer, such as due to an audit or litigation, for equipment or real property used beyond the period of performance, or due to other circumstances outlined in 2 C.F.R. § 200.334.  The recipient is responsible for refunding to FEMA any balances of unobligated cash that FEMA paid that are not authorized to be retained per 2 C.F.R. § 200.344(d).  II. ADMINISTRATIVE CLOSEOUT  Administrative closeout is a mechanism for FEMA to unilaterally move forward with closeout of an award using available award information in lieu of final reports from the recipient per 2 C.F.R. § 200.344(h)-(i). It is a last resort available to FEMA, and if FEMA needs to administratively close an award, this may negatively impact a recipient’s ability to obtain future funding. This mechanism can also require FEMA to make cash or cost adjustments and ineligible cost determinations based on the information it has, which may result in identifying a debt owed to FEMA by the recipient.  When a recipient is not responsive to FEMA’s reasonable efforts to collect required reports needed to complete the standard closeout process, FEMA is required under 2 C.F.R. § 200.344(h) to start the administrative closeout process within the regulatory timeframe. FEMA will make at least three written attempts to collect required reports before initiating administrative closeout. If the recipient does not submit all required reports in accordance with 2 C.F.R. § 200.344, this NOFO, and the terms and conditions of the award, FEMA must proceed to administratively close the award with the information available within one year of the period of performance end date. Additionally, if the recipient does not submit all required reports within one year of the period of performance end date, per 2 C.F.R. § 200.344(i), FEMA must report in FAPIIS the recipient’s material failure to comply with the terms and conditions of the award.  If FEMA administratively closes an award where no final FFR has been submitted, FEMA uses that administrative closeout date in lieu of the final FFR submission date as the start of the record retention period under 2 C.F.R. § 200.334.  In addition, if an award is administratively closed, FEMA may decide to impose remedies for noncompliance per 2 C.F.R. § 200.339, consider this information in reviewing future award applications, or apply special conditions to existing or future awards.  FY 2023 FMA Swift Current NOFO Back to the Top     45  d. Additional Reporting Requirements  I. DISCLOSING INFORMATION PER 2 C.F.R. § 180.335  This reporting requirement pertains to disclosing information related to government-wide suspension and debarment requirements. Before a recipient enters into a grant award with FEMA, the recipient must notify FEMA if it knows if it or any of the recipient’s principals under the award fall under one or more of the four criteria listed at 2 C.F.R. § 180.335:  i. Are presently excluded or disqualified; ii. Have been convicted within the preceding three years of any of the offenses listed in  2 C.F.R. § 180.800(a) or had a civil judgment rendered against it or any of the  recipient’s principals for one of those offenses within that time period; iii. Are presently indicted for or otherwise criminally or civilly charged by a  governmental entity (federal, state or local) with commission of any of the offenses  listed in 2 C.F.R. § 180.800(a); or iv. Have had one or more public transactions (federal, state, or local) terminated within  the preceding three years for cause or default.  At any time after accepting the award, if the recipient learns that it or any of its principals falls under one or more of the criteria listed at 2 C.F.R. § 180.335, the recipient must provide immediate written notice to FEMA in accordance with 2 C.F.R. § 180.350.  II. REPORTING OF MATTERS RELATED TO RECIPIENT INTEGRITY AND PERFORMANCE  Per 2 C.F.R. Part 200, Appendix I § F.3, the additional post-award reporting requirements in 2 C.F.R. Part 200, Appendix XII may apply to applicants who, if upon becoming recipients, have a total value of currently active grants, cooperative agreements, and procurement contracts from all federal awarding agencies that exceeds $10,000,000 for any period of time during the period of performance of an award under this funding opportunity.  Recipients that meet these criteria must maintain current information reported in FAPIIS about civil, criminal, or administrative proceedings described in paragraph 2 of Appendix XII at the reporting frequency described in paragraph 4 of Appendix XII.  III. SINGLE AUDIT REPORT  For audits of fiscal years beginning on or after December 26, 2014, recipients that expend $750,000 or more from all federal funding sources during their fiscal year are required to submit an organization-wide financial and compliance audit report, also known as the single audit report.  The audit must be performed in accordance with the requirements of U.S. Government Accountability Office’s (GAO) Government Auditing Standards, located at https://www.gao.gov/yellowbook/overview, and the requirements of Subpart F of 2 C.F.R. Part 200, located at http://www.ecfr.gov/cgi-bin/text-idx?node=sp2.1.200.f.  4. Monitoring and Oversight  Per 2 C.F.R. § 200.337, FEMA, through its authorized representatives, has the right, at all reasonable times, to make site visits or conduct desk reviews to review project accomplishments and management control systems to review award progress and to provide any required technical assistance. During site visits or desk reviews, FEMA will review      FY 2023 FMA Swift Current NOFO Back to the Top     46  recipients’ files related to the award. As part of any monitoring and program evaluation activities, recipients must permit FEMA, upon reasonable notice, to review grant-related records and to interview the organization’s staff and contractors regarding the program. Recipients must respond in a timely and accurate manner to FEMA requests for information relating to the award.  Effective monitoring and oversight help FEMA ensure that recipients use grant funds for their intended purpose(s); verify that projects undertaken are consistent with approved plans; and ensure that recipients make adequate progress toward stated goals and objectives.  Additionally, monitoring serves as the primary mechanism to ensure that recipients comply with applicable laws, rules, regulations, program guidance, and requirements. FEMA regularly monitors all grant programs both financially and programmatically in accordance with federal laws, regulations (including 2 C.F.R. Part 200), program guidance, and the terms and conditions of the award. All monitoring efforts ultimately serve to evaluate progress towards grant goals and proactively target and address issues that may threaten grant success during the period of performance.  FEMA staff will periodically monitor recipients to ensure that administrative processes, policies and procedures, budgets, and other related award criteria are meeting Federal Government-wide and FEMA regulations. Aside from reviewing quarterly financial and programmatic reports, FEMA may also conduct enhanced monitoring through either desk- based reviews, onsite monitoring visits, or both. Enhanced monitoring will involve the review and analysis of the financial compliance and administrative processes, policies, activities, and other attributes of each federal assistance award, and it will identify areas where the recipient may need technical assistance, corrective actions, or other support.  Financial and programmatic monitoring are complementary processes within FEMA’s overarching monitoring strategy that function together to ensure effective grants management, accountability, and transparency; validate progress against grant and program goals; and safeguard federal funds against fraud, waste, and abuse. Financial monitoring primarily focuses on statutory and regulatory compliance with administrative grant requirements, while programmatic monitoring seeks to validate and assist in grant progress, targeting issues that may be hindering achievement of project goals and ensuring compliance with the purpose of the grant and grant program. Both monitoring processes are similar in that they feature initial reviews of all open awards, and additional, in-depth monitoring of grants requiring additional attention.  Recipients and subrecipients who are pass-through entities are responsible for monitoring their subrecipients in a manner consistent with the terms of the federal award at 2 C.F.R. Part 200, including 2 C.F.R. § 200.332. This includes the pass-through entity’s responsibility to monitor the activities of the subrecipient as necessary to ensure that the subaward is used for authorized purposes, in compliance with federal statutes, regulations, and the terms and conditions of the subaward; and that subaward performance goals are achieved.", 20, 20, width/3*2 + 100, height)
  pop()
}


function loadGui() {
  fill(0)
  stroke(2)
  
  // frame rate
  frame_rate_slider = createSlider(1,40,2)
  frame_rate_slider.position( width/3*2+50, 50);
  frame_rate_slider.style('position','fixed');
  
  // weft thickness
  weft_thickness_slider = createSlider(0.5,20,4, 0.1)
  weft_thickness_slider.position( width/3*2+ 50, 80); 
  weft_thickness_slider.style('position','fixed');
  
  // vertical gap
  vertical_gap_slider = createSlider(0.1,20,4, 0.1)
  vertical_gap_slider.position( width/3*2+ 50, 110); 
  vertical_gap_slider.style('position','fixed');

  // warp thickness
  warp_thickness_slider = createSlider(0.5,20,4, 0.1)
  warp_thickness_slider.position( width/3*2+ 50, 140); 
  warp_thickness_slider.style('position','fixed');
  
  // warp gap
  warp_gap_slider = createSlider(0.1,20,2, 0.1)
  warp_gap_slider.position( width/3*2+ 50, 170); 
  warp_gap_slider.style('position','fixed');


  // image index 
  img_ind_slider = createSlider(0, img.length-1,0)
  img_ind_slider.position( width/3*2+ 50, 200); 
  img_ind_slider.style('position','fixed');

  
  // // image index 
  // img_ind_slider = createSlider(0, img.length-1,0)
  // img_ind_slider.position( width/3*2+ 50, 230); 
  // img_ind_slider.style('position','fixed');
  
  // start
  playButton = createButton('Start Loom!');
  playButton.position(width/3*2 + 50, 325);
  playButton.mousePressed(startLoom);
  playButton.style('position','fixed');
  
  // pause
  playButton = createButton('Pause Loom!');
  playButton.position(width/3*2 + 50, 350);
  playButton.mousePressed(pauseLoom);
  playButton.style('position','fixed');
  
  // reset
  playButton = createButton('Reset Loom!');
  playButton.position(width/3*2 + 50, 375);
  playButton.mousePressed(resetLoom);
  playButton.style('position','fixed');

  // weave over
  playButton = createButton('weave over!');
  playButton.position(width/3*2 + 50, 400);
  playButton.mousePressed(weaveOverLoom);
  playButton.style('position','fixed');
  
}

function startLoom(){
  start = true;
  pause = false;
  reset = false;
  weaveOver = false;
}

function pauseLoom(){
  start = false;
  pause = true;
  reset = false;
  weaveOver = false;
}


function resetLoom(){
  reset = true;
  start = false;
  pause = false;
  weaveOver = false;
}

function weaveOverLoom(){
  reset = false;
  start = false;
  pause = false;
  weaveOver = true;
}

function keyPressed() {
  if (key === "s") {
    saveCanvas();
  }
}


