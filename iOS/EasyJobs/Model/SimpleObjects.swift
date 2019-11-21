//
//  SimpleObjects.swift
//  EasyJobs
//
//  Created by Diablito on 21.11.2019.
//  Copyright © 2019 Diablito. All rights reserved.
//

import Foundation

struct SimpleAdvertisement: Codable{
    var id : Int
    var publishDate: Date
    var validUntil: Date
    var description: String
    var company: Company
    var matchRate: Double
}
struct SimpleCompany{
    var id: Int
    var email: String
    var foundedDate: Date
    var name: String
    var description: String
    var picture: String
}
