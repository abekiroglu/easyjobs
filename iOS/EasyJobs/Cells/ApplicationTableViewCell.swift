//
//  ApplicationsTableViewCell.swift
//  EasyJobs
//
//  Created by Diablito on 9.12.2019.
//  Copyright © 2019 Diablito. All rights reserved.
//

import UIKit

class ApplicationsTableViewCell: UITableViewCell {
    
    
    @IBOutlet weak var companyImageView: UIImageView!
    @IBOutlet weak var companyNameLabel: UILabel!
    @IBOutlet weak var matchRateLabel: UILabel!
    @IBOutlet weak var descriptionLabel: UILabel!
    
    override func awakeFromNib() {
        super.awakeFromNib()
        // Initialization code
    }

    override func setSelected(_ selected: Bool, animated: Bool) {
        super.setSelected(selected, animated: animated)

        // Configure the view for the selected state
    }

}
