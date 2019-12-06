//
//  AdvertisementViewController.swift
//  EasyJobs
//
//  Created by Diablito on 21.11.2019.
//  Copyright © 2019 Diablito. All rights reserved.
//

import UIKit

extension AdvertisementViewController: UITableViewDataSource{
    func numberOfSections(in tableView: UITableView) -> Int {
        return 1
    }
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        advertisementList.count
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
       
        let cell =  tableView.dequeueReusableCell(withIdentifier: "AdvertisementCell", for: indexPath) as! AdvertisementsTableViewCell
        let advertisement =  advertisementList[indexPath.row]
        
        cell.companyNameLabel.text = advertisement.company.name
        cell.matchRateLabel.text = "Match Rate: \(advertisement.matchRate)"
        cell.descriptionLabel.text = advertisement.description
        cell.companyImageView.image = UIImage(named: "AnimationTest")

        if advertisement.matchRate < 0.41{
            cell.matchRateLabel.textColor = UIColor.red
        }else if advertisement.matchRate < 0.71 {
            cell.matchRateLabel.textColor = UIColor.yellow
        }else{
            cell.matchRateLabel.textColor = UIColor.blue
        }
        cell.matchRateLabel.alpha = 0.6
        
        return cell
    }
}

extension AdvertisementViewController: AdvertisementDataSourceDelegate{
    
    func advertisementListLoaded(advertisementList: [SimpleAdvertisement]) {
        self.advertisementList = advertisementList
        if let isApp = isApplications{
            if let adIDs = advertisementIDs{
                var applicationList: [SimpleAdvertisement] = []
                for advertisement in advertisementList{
                    for adID in adIDs{
                        if advertisement.id == adID {
                            applicationList.append(advertisement)
                        }
                    }
                }
                self.advertisementList = applicationList
            }
        }
        self.advertisementsTableView.reloadData()
    }
}


class AdvertisementViewController: UIViewController {

    @IBOutlet weak var advertisementsTableView: UITableView!
    
    let advertisementDataSource = AdvertisementDataSource()
    var advertisementList : [SimpleAdvertisement] = []
    var isApplications : Bool?
    var advertisementIDs : [Int]?
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        advertisementDataSource.delegate = self
        advertisementDataSource.loadAdvertisementList()
    }
    
    
    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destination.
        // Pass the selected object to the new view controller.
        
        let cell = sender as! AdvertisementsTableViewCell
        let indexPath = advertisementsTableView.indexPath(for: cell)
        
        if let indexPath = indexPath{
            
            /* let advertisementID = advertisementList[indexPath.row].id
            
            let destination = segue.destination as! AdvertisementDetailViewController
            
            destination.advertisementID = advertisementID*/
            
            let advertisement = advertisementList[indexPath.row]
            
            let destination = segue.destination as! AdvertisementDetailViewController
            
            if let adIDs = advertisementIDs{
                if adIDs.count>0{
                    for id in adIDs {
                        if advertisement.id == id{
                            destination.isAlreadyApplied = true
                        }
                    }
                }
            }
            
            if let isApp = isApplications{
                destination.isAlreadyApplied = true
            }
            
            destination.advertisement = advertisement
        }
    }

   

}
