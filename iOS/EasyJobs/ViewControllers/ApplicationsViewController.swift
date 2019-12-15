//
//  ApplicationsViewController.swift
//  EasyJobs
//
//  Created by Diablito on 9.12.2019.
//  Copyright © 2019 Diablito. All rights reserved.
//

import UIKit


extension ApplicationsViewController: UITableViewDataSource{
    
    func numberOfSections(in tableView: UITableView) -> Int {
        print("numberOfSections Done")
        return 1
    }
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        print("numberOfRows Done: \(applicationList.count)")
        return applicationList.count
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        
        print("Dequeing cell")
        let cell =  tableView.dequeueReusableCell(withIdentifier: "ApplicationsCell", for: indexPath) as! ApplicationsTableViewCell
        let advertisement =  applicationList[indexPath.row]
        
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
    
    func applicationAdIdsLoaded(advertisementIds: [Int]) {
        applicationList = getApplications(advertisementIds: advertisementIds, advertisements: self.advertisementList).sorted(by: { $0.matchRate > $1.matchRate })
        print("Number of advertisements: \(advertisementList.count)")
        
        //print("Count: \(applicationList.count)")
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

    var advertisementList : [SimpleAdvertisement] = []
    var applicationList : [SimpleAdvertisement] = []
    let userHelper = UserHelper()
    let advertisementDataSource = AdvertisementDataSource()
    
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
            
            let advertisement = applicationList[indexPath.row]
            
            let destination = segue.destination as! ApplicationDetailViewController
            
            destination.advertisement = advertisement
            destination.isAlreadyApplied = true
        }

    }
    

}
