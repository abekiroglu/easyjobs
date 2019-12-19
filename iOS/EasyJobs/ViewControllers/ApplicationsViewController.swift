//
//  ApplicationsViewController.swift
//  EasyJobs
//
//  Created by Diablito on 9.12.2019.
//  Copyright © 2019 Diablito. All rights reserved.
//

import UIKit


extension ApplicationsViewController: UITableViewDataSource{
    
    func tableView(_ tableView: UITableView, titleForHeaderInSection section: Int) -> String? {
        if let isOffers = isOffers{
            if section == 0{
                return "Active Offers"
            }
            return "Old Offers"
        }
        if section == 0{
            return "Active Applications"
        }
        return "Old Applications"
    }
    
    func numberOfSections(in tableView: UITableView) -> Int {
        print("numberOfSections Done")
        return 2
    }
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        if section == 0{
            return applicationList.count
        }
        return oldApplications.count
        
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        
        
            let cell =  tableView.dequeueReusableCell(withIdentifier: "ApplicationsCell", for: indexPath) as! ApplicationsTableViewCell
            var advertisement = totalApplicationsList[indexPath.section][indexPath.row]
            
            cell.companyNameLabel.text = advertisement.company.name
            cell.matchRateLabel.text = "Match Rate: \(advertisement.matchRate)"
            cell.descriptionLabel.text = advertisement.description
            if let url = URL(string: advertisement.company.picture){
                cell.companyImageView.load(url: url)
            }

            if advertisement.matchRate < 0.61{
                cell.matchRateLabel.textColor = UIColor.orange
            }else if advertisement.matchRate < 0.81 {
                cell.matchRateLabel.textColor = UIColor.green
            }else{
                cell.matchRateLabel.textColor = UIColor.yellow
            }
            cell.matchRateLabel.alpha = 0.6
            return cell
        
    }
    
}

extension ApplicationsViewController: UserHelperDelegate{
    
    func applicationAdIdsLoaded(advertisementIds: [Int], oldAdvertisementIds: [Int], offeredAdvertisementIds: [Int], oldOfferedAdvertisementIds: [Int]) {
        print("OfferedAdvertisementIds count: \(offeredAdvertisementIds.count)")
        if let isOffers = isOffers{
            print("It is isOffers")
            applicationList = getApplications(advertisementIds: offeredAdvertisementIds, advertisements: self.advertisementList).sorted(by: { $0.matchRate > $1.matchRate })
            oldApplications = getApplications(advertisementIds: oldOfferedAdvertisementIds, advertisements: self.advertisementList)
            print("Offer count: \(applicationList.count)")
            print("Old offer count: \(oldApplications.count)")
        }else{
            applicationList = getApplications(advertisementIds: advertisementIds, advertisements: self.advertisementList).sorted(by: { $0.matchRate > $1.matchRate })
            oldApplications = getApplications(advertisementIds: oldAdvertisementIds, advertisements: self.advertisementList)
        }
            
        totalApplicationsList.append(applicationList)
        totalApplicationsList.append(oldApplications)
        self.applicationsTableView.reloadData()
    }
    
}

extension ApplicationsViewController: AdvertisementDataSourceDelegate{
    func advertisementListLoaded(advertisementList: [SimpleAdvertisement]) {
      /*  print("Applications Loaded")
        applicationList = advertisementList
        print("Count: \(applicationList.count)")
        self.applicationsTableView.reloadData()*/
        self.advertisementList = advertisementList
        userHelper.loadUser()
    }
}

class ApplicationsViewController: UIViewController {


    @IBOutlet weak var applicationsTableView: UITableView!

    var totalApplicationsList : [[SimpleAdvertisement]] = []
    var advertisementList : [SimpleAdvertisement] = []
    var applicationList : [SimpleAdvertisement] = []
    var oldApplications : [SimpleAdvertisement] = []
    let userHelper = UserHelper()
    let advertisementDataSource = AdvertisementDataSource()
    var isOffers: Bool?
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        advertisementDataSource.delegate = self
        userHelper.delegate = self
        advertisementDataSource.loadAdvertisementList()

        // Do any additional setup after loading the view.
    }
    

    
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        
        let cell = sender as! ApplicationsTableViewCell
               let indexPath = applicationsTableView.indexPath(for: cell)
        // Get the new view controller using segue.destination.
        // Pass the selected object to the new view controller.
        if let indexPath = indexPath{
            
            let advertisement = totalApplicationsList[indexPath.section][indexPath.row]
            
            let destination = segue.destination as! ApplicationDetailViewController
            
            destination.advertisement = advertisement
            destination.application = getApplication(applicationList: userHelper.bigLoadedUser.applications, adId: advertisement.id)
        }

    }
    

}
