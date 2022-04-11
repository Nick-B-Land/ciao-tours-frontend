import React, { Component } from "react";
import "../style/stylesheet.css";
import TopNav from "../components/navs/topNav";
import BottomAdminNav from "../components/navs/bottomAdminNav";
import TopNavWrapper from "../functionalComponents/topNavWrapper";

class Information extends Component {
	render() {
		return (
			<div className="container-fluid p-0 adminEmployeesPage">
				<div className="row d-flex">
					<TopNavWrapper currentUser={this.props.currentUser} />
					<BottomAdminNav />
				</div>
				<div className="row">
					<div className="col-2"></div>
					<div className="col-8 min-vh-100 innerAdmin">
						<div className="row">
							<div className="d-flex justify-content-center mainHeaders">
								<h1>My Information</h1>
							</div>
						</div>
						<div className="row">
							<div className="col-2"></div>
							<div className="col"></div>
						</div>
					</div>
					<div className="col-2"></div>
				</div>
			</div>
		);
	}
}

export default Information;
