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

extension AdvertisementViewController: AdvertisementDataSourceDelegate{
    
    func advertisementListLoaded(advertisementList: [SimpleAdvertisement]) {
        self.advertisementList = advertisementList.sorted(by: { $0.matchRate > $1.matchRate })
        print("Number of advertisements before removing applications: \(advertisementList.count)")
        userHelper.loadUser()
        
    }
}
extension AdvertisementViewController: UserHelperDelegate{
    func applicationsToRemoveLoaded(advertisementIds: [Int]) {
        advertisementList = removeApplications(advertisementIds: advertisementIds, advertisements: advertisementList)
        
        print("Number of advertisements after removing applications: \(advertisementList.count)")
        advertisementsTableView.reloadData()
    }
}

class AdvertisementViewController: UIViewController {

    @IBOutlet weak var advertisementsTableView: UITableView!
    
    let userHelper = UserHelper()
    let advertisementDataSource = AdvertisementDataSource()
    var advertisementList : [SimpleAdvertisement] = []
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        
        advertisementDataSource.delegate = self
        userHelper.delegate = self
        advertisementDataSource.loadAdvertisementList()
    }
    
    
    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destination.
        // Pass the selected object to the new view controller.
        
        let cell = sender as! AdvertisementsTableViewCell
        let indexPath = advertisementsTableView.indexPath(for: cell)
        
        if let indexPath = indexPath{
            
            let advertisement = advertisementList[indexPath.row]
            
            let destination = segue.destination as! AdvertisementDetailViewController
            
            
            destination.advertisement = advertisement
            
        }
    }

        
}
